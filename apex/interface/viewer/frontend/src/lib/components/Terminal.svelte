<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let logs: string[] = [];
  export let title: string = 'APEX // REALTIME HACKER TERMINAL';

  let terminalContainer: HTMLDivElement;
  let term: any = null;
  let fitAddon: any = null;

  onMount(async () => {
    if (typeof window === 'undefined') return;

    try {
      const { Terminal } = await import('@xterm/xterm');
      const { FitAddon } = await import('@xterm/addon-fit');

      term = new Terminal({
        theme: {
          background: '#030712',
          foreground: '#00ff9d',
          cursor: '#00ff9d',
          selectionBackground: '#065f46',
          black: '#030712',
          green: '#00ff9d',
          brightGreen: '#50fa7b',
          cyan: '#8be9fd',
          red: '#ff5555'
        },
        fontFamily: 'ui-monospace, SFMono-Regular, "Fira Code", "JetBrains Mono", Consolas, monospace',
        fontSize: 13,
        lineHeight: 1.3,
        cursorBlink: true,
        convertEol: true
      });

      fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalContainer);
      fitAddon.fit();

      term.writeln('\x1b[32m[+] APEX RED-TEAM TERMINAL ENGINE ONLINE.\x1b[0m');
      term.writeln('\x1b[90m[*] Listening for live agent event stream...\x1b[0m\n');

      if (logs && logs.length > 0) {
        logs.forEach(line => term.writeln(line));
      }

      window.addEventListener('resize', handleResize);
    } catch (err) {
      console.error('Terminal init error:', err);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
    }
    if (term) term.dispose();
  });

  function handleResize() {
    if (fitAddon) {
      try { fitAddon.fit(); } catch {}
    }
  }

  $: if (term && logs) {
    term.clear();
    term.writeln('\x1b[32m[+] APEX RED-TEAM TERMINAL ENGINE ONLINE.\x1b[0m\n');
    logs.forEach(line => term.writeln(line));
  }
</script>

<div class="flex flex-col h-full bg-slate-950/90 border border-emerald-900/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md glow-emerald font-mono">
  <div class="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-emerald-900/40">
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
      <div class="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
      <div class="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
      <span class="ml-2 text-xs text-emerald-400 font-bold tracking-wider">{title}</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-800/80 font-bold flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        STREAMING
      </span>
    </div>
  </div>
  <div bind:this={terminalContainer} class="flex-1 p-3 min-h-[300px]"></div>
</div>
