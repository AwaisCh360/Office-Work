<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fetchRuns, fetchRunDetail, fetchRunState, fetchVulnerabilities, fetchReport } from '$lib/api';
  import type { RunSummary, RunDetail, Agent, Vulnerability } from '$lib/types';
  import Terminal from '$lib/components/Terminal.svelte';
  import Vulnerabilities from '$lib/components/Vulnerabilities.svelte';
  import SteerModal from '$lib/components/SteerModal.svelte';
  import ScanConfigModal from '$lib/components/ScanConfigModal.svelte';
  import AgentTopology from '$lib/components/AgentTopology.svelte';
  import ReportViewer from '$lib/components/ReportViewer.svelte';

  let runs: RunSummary[] = [];
  let currentRun: RunDetail | null = null;
  let agents: Agent[] = [];
  let vulnerabilities: Vulnerability[] = [];
  let reportMarkdown: string = '';
  let selectedAgentId: string | null = null;

  let activeTab: 'terminal' | 'vulns' | 'report' = 'terminal';
  let isSteerOpen: boolean = false;
  let isConfigOpen: boolean = false;
  let timer: any = null;

  async function loadData() {
    runs = await fetchRuns();
    if (runs.length > 0) {
      const activeOrLatest = runs[0];
      currentRun = await fetchRunDetail(activeOrLatest.name);
      
      const stateData = await fetchRunState(activeOrLatest.name);
      agents = stateData.agents || [];
      
      vulnerabilities = await fetchVulnerabilities(activeOrLatest.name);
      reportMarkdown = await fetchReport(activeOrLatest.name);
    }
  }

  onMount(() => {
    loadData();
    timer = setInterval(loadData, 2000);
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });

  $: filteredLogs = (() => {
    if (!currentRun) return [];
    if (!selectedAgentId) return currentRun.logs || [];
    const prefix = `[${selectedAgentId}]`;
    return (currentRun.logs || []).filter(line => line.includes(prefix) || line.includes(selectedAgentId!));
  })();
</script>

<div class="flex flex-col gap-6 w-full font-mono">
  <!-- Active Target Command Banner -->
  <div class="p-6 bg-slate-900/80 border border-emerald-500/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-xl glow-emerald relative overflow-hidden">
    <!-- Background Animated Radar Grid -->
    <div class="absolute -right-16 -top-16 w-56 h-56 border border-emerald-500/10 rounded-full flex items-center justify-center pointer-events-none">
      <div class="w-40 h-40 border border-emerald-500/10 rounded-full flex items-center justify-center">
        <div class="w-24 h-24 border border-emerald-500/15 rounded-full"></div>
      </div>
      <div class="absolute w-full h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 animate-radar"></div>
    </div>

    <div class="flex flex-col gap-2 relative z-10">
      <div class="flex items-center gap-3">
        <span class="text-xs tracking-widest text-emerald-400 font-bold uppercase flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          TARGET ATTACK SURFACE
        </span>
        {#if currentRun && !currentRun.finished}
          <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs bg-emerald-950/90 text-emerald-400 border border-emerald-600/80 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse">
            ⚡ EXPLOITATION ACTIVE
          </span>
        {:else}
          <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs bg-slate-800/90 text-slate-300 border border-slate-700 font-semibold">
            SCAN COMPLETED
          </span>
        {/if}
      </div>
      <h1 class="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight font-mono text-emerald-300 drop-shadow-md">
        {currentRun ? currentRun.target : 'NO TARGET CONFIGURED'}
      </h1>
      {#if currentRun}
        <div class="flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span>RUN: <strong class="text-slate-200">{currentRun.name}</strong></span>
          <span>•</span>
          <span>MODE: <strong class="text-emerald-400 uppercase">{currentRun.scan_mode || 'DEEP'}</strong></span>
          <span>•</span>
          <span>ACTIVE AGENTS: <strong class="text-cyan-400">{agents.length}</strong></span>
        </div>
      {/if}
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center gap-3 relative z-10">
      <button
        on:click={() => (isConfigOpen = true)}
        class="px-4 py-2.5 bg-slate-950/80 hover:bg-slate-900 text-slate-200 border border-emerald-500/40 hover:border-emerald-400 font-bold rounded-xl text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
      >
        <span>⚙️</span> SCAN CONFIG
      </button>

      {#if currentRun}
        <button
          on:click={() => (isSteerOpen = true)}
          class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black rounded-xl text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center gap-2"
        >
          <span>🎯</span> STEER LIVE AGENTS
        </button>
      {/if}
    </div>
  </div>

  <!-- Cyberpunk Threat Metrics Grid -->
  {#if currentRun}
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
      <div class="p-4 bg-rose-950/40 border border-rose-800/60 rounded-2xl flex flex-col gap-1.5 backdrop-blur-md glow-crimson transition-transform hover:scale-[1.02]">
        <span class="text-[10px] tracking-widest uppercase text-rose-400 font-bold">Critical Threat</span>
        <span class="text-3xl font-black text-rose-400">{currentRun.severity_counts.critical || 0}</span>
      </div>
      <div class="p-4 bg-orange-950/40 border border-orange-800/60 rounded-2xl flex flex-col gap-1.5 backdrop-blur-md transition-transform hover:scale-[1.02]">
        <span class="text-[10px] tracking-widest uppercase text-orange-400 font-bold">High Threat</span>
        <span class="text-3xl font-black text-orange-400">{currentRun.severity_counts.high || 0}</span>
      </div>
      <div class="p-4 bg-amber-950/40 border border-amber-800/60 rounded-2xl flex flex-col gap-1.5 backdrop-blur-md transition-transform hover:scale-[1.02]">
        <span class="text-[10px] tracking-widest uppercase text-amber-400 font-bold">Medium Threat</span>
        <span class="text-3xl font-black text-amber-400">{currentRun.severity_counts.medium || 0}</span>
      </div>
      <div class="p-4 bg-cyan-950/40 border border-cyan-800/60 rounded-2xl flex flex-col gap-1.5 backdrop-blur-md transition-transform hover:scale-[1.02]">
        <span class="text-[10px] tracking-widest uppercase text-cyan-400 font-bold">Low Threat</span>
        <span class="text-3xl font-black text-cyan-400">{currentRun.severity_counts.low || 0}</span>
      </div>
      <div class="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col gap-1.5 backdrop-blur-md transition-transform hover:scale-[1.02]">
        <span class="text-[10px] tracking-widest uppercase text-slate-400 font-bold">Informational</span>
        <span class="text-3xl font-black text-slate-300">{currentRun.severity_counts.info || 0}</span>
      </div>
    </div>
  {/if}

  <!-- Multi-Agent Topology Filter Bar -->
  <AgentTopology {agents} {selectedAgentId} onSelectAgent={(id) => (selectedAgentId = id)} />

  <!-- View Mode Tabs -->
  <div class="flex items-center justify-between border-b border-emerald-900/40 pb-2">
    <div class="flex items-center gap-2">
      <button
        on:click={() => (activeTab = 'terminal')}
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 {activeTab === 'terminal' ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'}"
      >
        <span>📺</span> REALTIME TERMINAL LOGS
      </button>

      <button
        on:click={() => (activeTab = 'vulns')}
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 {activeTab === 'vulns' ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'}"
      >
        <span>🛡️</span> THREAT VAULT ({vulnerabilities.length})
      </button>

      <button
        on:click={() => (activeTab = 'report')}
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 {activeTab === 'report' ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'}"
      >
        <span>📝</span> EXECUTIVE REPORT & PDF
      </button>
    </div>
  </div>

  <!-- Main View Container -->
  <div class="h-[580px] w-full">
    {#if activeTab === 'terminal'}
      <Terminal logs={filteredLogs} title="APEX // REALTIME HACKER TERMINAL STREAM" />
    {:else if activeTab === 'vulns'}
      <Vulnerabilities {vulnerabilities} />
    {:else if activeTab === 'report'}
      <ReportViewer {reportMarkdown} runName={currentRun ? currentRun.name : ''} />
    {/if}
  </div>
</div>

<ScanConfigModal isOpen={isConfigOpen} onClose={() => (isConfigOpen = false)} />

{#if currentRun}
  <SteerModal runName={currentRun.name} isOpen={isSteerOpen} onClose={() => (isSteerOpen = false)} />
{/if}
