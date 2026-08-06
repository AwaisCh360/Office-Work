<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
</script>

<div class="min-h-screen flex flex-col bg-slate-950 text-slate-100 cyber-grid relative overflow-x-hidden font-mono selection:bg-emerald-500 selection:text-slate-950">
  <!-- CRT Scanline effect -->
  <div class="fixed inset-0 scanline-overlay z-50 opacity-15 pointer-events-none"></div>

  <!-- Command Center Header Bar -->
  <header class="h-16 bg-slate-950/85 border-b border-emerald-900/40 px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl glow-emerald">
    <div class="flex items-center gap-4">
      <a href="/" class="flex items-center gap-3 group">
        <div class="relative">
          <img src="/logo.png" alt="Apex Logo" class="w-9 h-9 rounded-xl border border-emerald-500/40 group-hover:border-emerald-400 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="text-xl font-black font-mono tracking-widest bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow">APEX</span>
            <span class="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-700 font-bold uppercase tracking-wider">COMMAND CENTER v0.2.2</span>
          </div>
          <span class="text-[9px] font-mono text-slate-400 tracking-widest uppercase">Autonomous AI Penetration Testing Engine</span>
        </div>
      </a>
    </div>

    <!-- Center Navigation Hub -->
    <nav class="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-emerald-900/40 shadow-inner">
      <a
        href="/"
        class="px-4 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 {$page.url.pathname === '/' ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'}"
      >
        <span class="w-1.5 h-1.5 rounded-full {$page.url.pathname === '/' ? 'bg-slate-950' : 'bg-emerald-400'}"></span>
        DASHBOARD HUD
      </a>
      <a
        href="/runs"
        class="px-4 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 {$page.url.pathname === '/runs' ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'}"
      >
        <span class="w-1.5 h-1.5 rounded-full {$page.url.pathname === '/runs' ? 'bg-slate-950' : 'bg-cyan-400'}"></span>
        ATTACK VAULT
      </a>
    </nav>

    <!-- Right Side Status & Link -->
    <div class="flex items-center gap-4 text-xs">
      <div class="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-900/50 text-emerald-400 text-[11px] font-semibold">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>ENGINE: RUNNING</span>
      </div>
      <a
        href="https://github.com/AwaisCh360/Office-Work"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub Repository"
        class="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all shadow-md"
      >
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      </a>
    </div>
  </header>

  <!-- Page Content -->
  <main class="flex-1 flex flex-col p-6 max-w-7xl w-full mx-auto relative z-10">
    <slot />
  </main>
</div>
