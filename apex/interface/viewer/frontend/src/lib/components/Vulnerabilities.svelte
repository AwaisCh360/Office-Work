<script lang="ts">
  import type { Vulnerability } from '../types';

  export let vulnerabilities: Vulnerability[] = [];

  let selectedVuln: Vulnerability | null = null;

  function severityBadge(sev: string) {
    switch (sev.toLowerCase()) {
      case 'critical': return 'bg-rose-950/90 text-rose-400 border-rose-700 glow-crimson';
      case 'high': return 'bg-orange-950/90 text-orange-400 border-orange-700';
      case 'medium': return 'bg-amber-950/90 text-amber-400 border-amber-700';
      case 'low': return 'bg-cyan-950/90 text-cyan-400 border-cyan-700';
      default: return 'bg-slate-900 text-slate-400 border-slate-700';
    }
  }
</script>

<div class="flex flex-col h-full bg-slate-950/90 border border-emerald-900/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md glow-emerald font-mono">
  <div class="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-emerald-900/40">
    <div class="flex items-center gap-2">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">THREAT VAULT // FINDINGS</span>
      <span class="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">{vulnerabilities.length} DETECTED</span>
    </div>
  </div>

  <div class="flex-1 flex divide-x divide-emerald-900/30 overflow-hidden">
    <!-- List -->
    <div class="w-1/2 overflow-y-auto divide-y divide-emerald-900/20">
      {#if vulnerabilities.length === 0}
        <div class="p-8 text-center text-slate-500 text-xs">NO VULNERABILITIES IDENTIFIED YET</div>
      {:else}
        {#each vulnerabilities as item}
          <button
            type="button"
            class="w-full p-4 text-left hover:bg-emerald-950/30 transition-colors flex flex-col gap-2 {selectedVuln?.id === item.id ? 'bg-emerald-950/60 border-l-4 border-emerald-400' : ''}"
            on:click={() => (selectedVuln = item)}
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider {severityBadge(item.severity)}">
                {item.severity}
              </span>
              {#if item.cvss_score}
                <span class="text-[11px] text-slate-400">CVSS {item.cvss_score}</span>
              {/if}
            </div>
            <h4 class="text-xs font-bold text-slate-200 line-clamp-1">{item.title}</h4>
            {#if item.location}
              <p class="text-[11px] text-emerald-500/80 truncate font-mono">{item.location}</p>
            {/if}
          </button>
        {/each}
      {/if}
    </div>

    <!-- Detail -->
    <div class="w-1/2 p-5 overflow-y-auto bg-slate-950/80">
      {#if selectedVuln}
        <div class="flex flex-col gap-4">
          <div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider {severityBadge(selectedVuln.severity)}">
              {selectedVuln.severity}
            </span>
            <h3 class="text-base font-extrabold text-slate-100 mt-2">{selectedVuln.title}</h3>
            {#if selectedVuln.owasp_category}
              <span class="text-xs text-emerald-400 mt-1 inline-block font-semibold">{selectedVuln.owasp_category}</span>
            {/if}
          </div>

          <div>
            <h4 class="text-[10px] uppercase text-slate-400 mb-1 tracking-wider">Vulnerability Summary</h4>
            <p class="text-xs text-slate-300 leading-relaxed font-sans">{selectedVuln.description}</p>
          </div>

          {#if selectedVuln.proof_of_concept}
            <div>
              <h4 class="text-[10px] uppercase text-emerald-400 mb-1 tracking-wider font-bold">Proof of Concept (Exploit Payload)</h4>
              <pre class="p-3 bg-slate-900/90 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto border border-emerald-900/50 shadow-inner">{selectedVuln.proof_of_concept}</pre>
            </div>
          {/if}

          {#if selectedVuln.remediation}
            <div>
              <h4 class="text-[10px] uppercase text-cyan-400 mb-1 tracking-wider font-bold">Recommended Mitigation</h4>
              <p class="text-xs text-slate-300 bg-cyan-950/30 p-3 rounded-xl border border-cyan-900/50 font-sans">{selectedVuln.remediation}</p>
            </div>
          {/if}
        </div>
      {:else}
        <div class="h-full flex items-center justify-center text-slate-500 text-xs">
          Select a threat entry from the left payload list.
        </div>
      {/if}
    </div>
  </div>
</div>
