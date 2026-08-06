<script lang="ts">
  export let reportMarkdown: string = '';
  export let runName: string = '';

  let copied: boolean = false;

  function copyReport() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(reportMarkdown);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    }
  }
</script>

<div class="flex flex-col h-full bg-slate-950/90 border border-emerald-900/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl font-mono">
  <div class="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-emerald-900/40">
    <div class="flex items-center gap-3">
      <span class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
      <h3 class="text-xs font-black uppercase text-cyan-400 tracking-wider">EXECUTIVE PENETRATION TEST REPORT</h3>
    </div>

    <div class="flex items-center gap-2">
      <button
        on:click={copyReport}
        class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
      >
        <span>📋</span> {copied ? 'COPIED' : 'COPY MARKDOWN'}
      </button>

      {#if runName}
        <a
          href="/api/report.pdf?run={runName}"
          target="_blank"
          download="apex-report-{runName}.pdf"
          class="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-1.5"
        >
          <span>📥</span> DOWNLOAD PDF
        </a>
      {/if}
    </div>
  </div>

  <div class="flex-1 p-6 overflow-y-auto font-sans text-slate-200 leading-relaxed text-sm">
    {#if !reportMarkdown || reportMarkdown.trim() === ''}
      <div class="h-full flex flex-col items-center justify-center text-slate-500 text-xs font-mono gap-2">
        <span class="text-2xl">📝</span>
        <span>Executive report will be generated automatically when the scan completes.</span>
      </div>
    {:else}
      <div class="prose prose-invert max-w-none prose-emerald">
        <pre class="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto whitespace-pre-wrap leading-normal">{reportMarkdown}</pre>
      </div>
    {/if}
  </div>
</div>
