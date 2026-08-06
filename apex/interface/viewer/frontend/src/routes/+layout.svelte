<script lang="ts">
  import '../app.css';
</script>

<div class="min-h-screen flex flex-col bg-slate-950 text-slate-100 cyber-grid relative overflow-x-hidden">
  <!-- CRT Scanline effect -->
  <div class="fixed inset-0 scanline-overlay z-50 opacity-20 pointer-events-none"></div>

  <!-- Hacker Top HUD Bar -->
  <header class="h-16 bg-slate-950/90 border-b border-emerald-900/40 px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md glow-emerald">
    <div class="flex items-center gap-4">
      <a href="/" class="flex items-center gap-3 group">
        <div class="relative">
          <img src="/logo.png" alt="Apex Logo" class="w-9 h-9 rounded-lg border border-emerald-500/40 group-hover:scale-105 transition-transform" />
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="text-lg font-extrabold font-mono tracking-widest bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">APEX</span>
            <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 uppercase font-semibold">RED TEAM v0.1</span>
          </div>
          <span class="text-[9px] font-mono text-emerald-500/70 tracking-widest uppercase font-semibold">Autonomous AI Pentest Engine</span>
        </div>
      </a>
    </div>

    <!-- Navigation Hub -->
    <nav class="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-emerald-900/30 font-mono">
      <a href="/" class="px-4 py-1.5 text-xs font-semibold rounded-lg transition-all hover:bg-emerald-950/60 hover:text-emerald-300 text-emerald-400 flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        Dashboard HUD
      </a>
      <a href="/runs" class="px-4 py-1.5 text-xs font-medium rounded-lg transition-all hover:bg-slate-800/60 text-slate-400 hover:text-slate-200">
        Attack History
      </a>
    </nav>

    <!-- Right Side Metrics & Link -->
    <div class="flex items-center gap-4 font-mono text-xs">
      <div class="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-emerald-400/90 text-[11px]">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        SYSTEM: ONLINE
      </div>
      <a href="https://github.com/AwaisCh360/Office-Work" target="_blank" rel="noreferrer" aria-label="GitHub Repository" class="p-2 text-slate-400 hover:text-emerald-400 transition-colors">
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      </a>
    </div>
  </header>

  <!-- Page Content Container -->
  <main class="flex-1 flex flex-col p-6 max-w-7xl w-full mx-auto relative z-10">
    <slot />
  </main>
</div>
