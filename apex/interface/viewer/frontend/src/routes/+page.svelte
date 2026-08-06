<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fetchRuns, fetchRunDetail } from '$lib/api';
  import type { RunSummary, RunDetail } from '$lib/types';
  import Terminal from '$lib/components/Terminal.svelte';
  import Vulnerabilities from '$lib/components/Vulnerabilities.svelte';
  import SteerModal from '$lib/components/SteerModal.svelte';

  let runs: RunSummary[] = [];
  let currentRun: RunDetail | null = null;
  let isSteerOpen: boolean = false;
  let timer: any = null;

  async function loadData() {
    runs = await fetchRuns();
    if (runs.length > 0) {
      const activeOrLatest = runs[0];
      currentRun = await fetchRunDetail(activeOrLatest.name);
    }
  }

  onMount(() => {
    loadData();
    timer = setInterval(loadData, 2000);
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

<div class="flex flex-col gap-6 w-full font-mono">
  <!-- Active Target Radar Banner -->
  <div class="p-6 bg-slate-900/80 border border-emerald-900/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md glow-emerald relative overflow-hidden">
    <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="flex flex-col gap-1.5">
      <div class="flex items-center gap-3">
        <span class="text-xs tracking-widest text-emerald-400 font-bold uppercase flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          TARGET ATTACK SURFACE
        </span>
        {#if currentRun && !currentRun.finished}
          <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs bg-emerald-950/90 text-emerald-400 border border-emerald-700 font-semibold animate-pulse">
            ⚡ EXPLOITATION IN PROGRESS
          </span>
        {:else}
          <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700">
            SCAN COMPLETED
          </span>
        {/if}
      </div>
      <h1 class="text-2xl font-extrabold text-slate-100 tracking-tight font-mono text-emerald-300 drop-shadow">
        {currentRun ? currentRun.target : 'NO TARGET SPECIFIED'}
      </h1>
    </div>

    {#if currentRun}
      <div class="flex items-center gap-3">
        <button
          on:click={() => (isSteerOpen = true)}
          class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] flex items-center gap-2"
        >
          <span>🎯</span> STEER LIVE AGENTS
        </button>
      </div>
    {/if}
  </div>

  <!-- Cyberpunk Threat Metrics Grid -->
  {#if currentRun}
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
      <div class="p-4 bg-rose-950/30 border border-rose-900/60 rounded-xl flex flex-col gap-1 backdrop-blur-sm glow-crimson">
        <span class="text-[10px] tracking-widest uppercase text-rose-400 font-semibold">Critical Threat</span>
        <span class="text-3xl font-black text-rose-400">{currentRun.severity_counts.critical || 0}</span>
      </div>
      <div class="p-4 bg-orange-950/30 border border-orange-900/60 rounded-xl flex flex-col gap-1 backdrop-blur-sm">
        <span class="text-[10px] tracking-widest uppercase text-orange-400 font-semibold">High Threat</span>
        <span class="text-3xl font-black text-orange-400">{currentRun.severity_counts.high || 0}</span>
      </div>
      <div class="p-4 bg-amber-950/30 border border-amber-900/60 rounded-xl flex flex-col gap-1 backdrop-blur-sm">
        <span class="text-[10px] tracking-widest uppercase text-amber-400 font-semibold">Medium Threat</span>
        <span class="text-3xl font-black text-amber-400">{currentRun.severity_counts.medium || 0}</span>
      </div>
      <div class="p-4 bg-cyan-950/30 border border-cyan-900/60 rounded-xl flex flex-col gap-1 backdrop-blur-sm">
        <span class="text-[10px] tracking-widest uppercase text-cyan-400 font-semibold">Low Threat</span>
        <span class="text-3xl font-black text-cyan-400">{currentRun.severity_counts.low || 0}</span>
      </div>
      <div class="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col gap-1 backdrop-blur-sm">
        <span class="text-[10px] tracking-widest uppercase text-slate-400 font-semibold">Informational</span>
        <span class="text-3xl font-black text-slate-300">{currentRun.severity_counts.info || 0}</span>
      </div>
    </div>
  {/if}

  <!-- Split View: Hacker Web Terminal & Vulnerability Vault -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[560px]">
    <Terminal logs={currentRun?.logs || []} title="APEX // REALTIME HACKER TERMINAL" />
    <Vulnerabilities vulnerabilities={currentRun?.vulnerabilities || []} />
  </div>
</div>

{#if currentRun}
  <SteerModal runName={currentRun.name} isOpen={isSteerOpen} onClose={() => (isSteerOpen = false)} />
{/if}
