<script lang="ts">
  import type { Agent } from '../types';

  export let agents: Agent[] = [];
  export let selectedAgentId: string | null = null;
  export let onSelectAgent: (agentId: string | null) => void = () => {};

  function statusColor(status: string) {
    switch (status.toLowerCase()) {
      case 'running': return 'bg-emerald-400 text-emerald-400';
      case 'waiting': return 'bg-amber-400 text-amber-400';
      case 'completed': return 'bg-cyan-400 text-cyan-400';
      case 'failed':
      case 'crashed': return 'bg-rose-400 text-rose-400';
      default: return 'bg-slate-400 text-slate-400';
    }
  }
</script>

<div class="flex flex-col bg-slate-900/90 border border-emerald-900/40 rounded-2xl p-4 gap-3 backdrop-blur-xl font-mono">
  <div class="flex items-center justify-between">
    <span class="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      AGENT TOPOLOGY ({agents.length})
    </span>
    {#if selectedAgentId}
      <button
        on:click={() => onSelectAgent(null)}
        class="text-[10px] text-slate-400 hover:text-emerald-400 font-bold uppercase transition-colors"
      >
        ✕ RESET FILTER
      </button>
    {/if}
  </div>

  {#if agents.length === 0}
    <div class="text-xs text-slate-500 py-3 text-center">No agents initialized yet.</div>
  {:else}
    <div class="flex items-center gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        on:click={() => onSelectAgent(null)}
        class="px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 shrink-0 {selectedAgentId === null ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'}"
      >
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        ALL AGENTS ({agents.length})
      </button>

      {#each agents as agent}
        <button
          type="button"
          on:click={() => onSelectAgent(agent.id)}
          class="px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 shrink-0 {selectedAgentId === agent.id ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'}"
        >
          <span class="w-2 h-2 rounded-full {statusColor(agent.status)}"></span>
          <span>{agent.name || agent.id}</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 uppercase font-mono border border-slate-800">
            {agent.status}
          </span>
        </button>
      {/each}
    </div>
  {/if}
</div>
