<script lang="ts">
  export let isOpen: boolean = false;
  export let onClose: () => void = () => {};

  let activeTab: 'target' | 'mode' | 'budget' = 'target';
  let target: string = '';
  let scanMode: 'quick' | 'standard' | 'deep' = 'deep';
  let scopeMode: 'auto' | 'diff' | 'full' = 'auto';
  let diffBase: string = 'origin/main';
  let customInstruction: string = '';
  let maxBudgetUsd: number | '' = '';
  let maxTurns: number = 500;
  let copiedCommand: boolean = false;

  $: generatedCliCommand = (() => {
    let cmd = 'apex';
    if (target.trim()) {
      cmd += ` --target "${target.trim()}"`;
    } else {
      cmd += ` --target https://example.com`;
    }

    if (scanMode !== 'deep') {
      cmd += ` --scan-mode ${scanMode}`;
    }

    if (scopeMode !== 'auto') {
      cmd += ` --scope-mode ${scopeMode}`;
      if (scopeMode === 'diff' && diffBase) {
        cmd += ` --diff-base ${diffBase}`;
      }
    }

    if (customInstruction.trim()) {
      cmd += ` --instruction "${customInstruction.trim()}"`;
    }

    if (maxBudgetUsd && Number(maxBudgetUsd) > 0) {
      cmd += ` --max-budget ${maxBudgetUsd}`;
    }

    if (maxTurns && maxTurns !== 500) {
      cmd += ` --max-turns ${maxTurns}`;
    }

    return cmd;
  })();

  function copyCommand() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(generatedCliCommand);
      copiedCommand = true;
      setTimeout(() => (copiedCommand = false), 2000);
    }
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
    <div class="bg-slate-950/95 border border-emerald-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl glow-emerald flex flex-col font-mono text-slate-100">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-emerald-900/40">
        <div class="flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
          <h3 class="text-sm font-black tracking-widest text-emerald-400 uppercase">⚡ ATTACK LAUNCHER CONFIGURATOR</h3>
        </div>
        <button on:click={onClose} class="text-slate-400 hover:text-slate-100 text-lg transition-colors">✕</button>
      </div>

      <!-- Tab Navigation -->
      <div class="flex items-center border-b border-emerald-900/30 px-6 bg-slate-900/40 text-xs font-bold">
        <button
          on:click={() => (activeTab = 'target')}
          class="py-3 px-4 border-b-2 transition-all {activeTab === 'target' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}"
        >
          1. TARGET & INSTRUCTION
        </button>
        <button
          on:click={() => (activeTab = 'mode')}
          class="py-3 px-4 border-b-2 transition-all {activeTab === 'mode' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}"
        >
          2. SCAN & SCOPE MODE
        </button>
        <button
          on:click={() => (activeTab = 'budget')}
          class="py-3 px-4 border-b-2 transition-all {activeTab === 'budget' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}"
        >
          3. BUDGET & TURNS
        </button>
      </div>

      <!-- Modal Body Form -->
      <div class="p-6 flex flex-col gap-5 max-h-[60vh] overflow-y-auto">
        {#if activeTab === 'target'}
          <!-- Target Input -->
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold uppercase tracking-wider text-emerald-400" for="scan-target-tab">Target Attack Surface (--target)</label>
            <input
              id="scan-target-tab"
              type="text"
              bind:value={target}
              placeholder="e.g. https://example.com, ./my-project, postman://<collection-uuid>, openapi.yaml"
              class="px-4 py-3 bg-slate-900/90 border border-emerald-900/60 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 shadow-inner"
            />
            <span class="text-[10px] text-slate-400">URL, Domain, IP, Local repo path, OpenAPI spec file, or Postman collection ID</span>
          </div>

          <!-- Custom Instructions -->
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold uppercase tracking-wider text-emerald-400" for="custom-instruction-tab">Custom Instructions (--instruction)</label>
            <textarea
              id="custom-instruction-tab"
              bind:value={customInstruction}
              rows="4"
              placeholder="Credentials: admin:secretpass&#10;Focus: Test IDOR on /api/user, Auth bypass, and SQL injection."
              class="px-4 py-3 bg-slate-900/90 border border-emerald-900/60 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 shadow-inner"
            ></textarea>
          </div>
        {:else if activeTab === 'mode'}
          <!-- Scan Mode -->
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold uppercase tracking-wider text-emerald-400" for="scan-mode-tab">Scan Depth (--scan-mode)</label>
            <select
              id="scan-mode-tab"
              bind:value={scanMode}
              class="px-4 py-3 bg-slate-900/90 border border-emerald-900/60 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-400"
            >
              <option value="quick">Quick (Fast CI/CD Checks)</option>
              <option value="standard">Standard (Routine Review)</option>
              <option value="deep">Deep (Thorough Exploitation - Default)</option>
            </select>
          </div>

          <!-- Scope Mode -->
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold uppercase tracking-wider text-emerald-400" for="scope-mode-tab">Scope Mode (--scope-mode)</label>
            <select
              id="scope-mode-tab"
              bind:value={scopeMode}
              class="px-4 py-3 bg-slate-900/90 border border-emerald-900/60 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-400"
            >
              <option value="auto">Auto (Smart PR Diff Scope)</option>
              <option value="diff">Diff (Force Changed Files Only)</option>
              <option value="full">Full (Full Repository Surface)</option>
            </select>
          </div>

          {#if scopeMode === 'diff'}
            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold uppercase tracking-wider text-amber-400" for="diff-base-tab">Diff Base Branch (--diff-base)</label>
              <input
                id="diff-base-tab"
                type="text"
                bind:value={diffBase}
                placeholder="e.g. origin/main"
                class="px-4 py-3 bg-slate-900/90 border border-amber-900/60 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          {/if}
        {:else if activeTab === 'budget'}
          <!-- Max Budget USD -->
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold uppercase tracking-wider text-emerald-400" for="max-budget-tab">Max Spend Limit USD (--max-budget)</label>
            <input
              id="max-budget-tab"
              type="number"
              bind:value={maxBudgetUsd}
              placeholder="No limit (e.g. 10, 25)"
              class="px-4 py-3 bg-slate-900/90 border border-emerald-900/60 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <!-- Max Turns -->
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold uppercase tracking-wider text-emerald-400" for="max-turns-tab">Max Turns Per Agent (--max-turns)</label>
            <input
              id="max-turns-tab"
              type="number"
              bind:value={maxTurns}
              placeholder="500"
              class="px-4 py-3 bg-slate-900/90 border border-emerald-900/60 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-400"
            />
          </div>
        {/if}

        <!-- Generated Command Box -->
        <div class="mt-3 p-4 bg-slate-900/90 rounded-2xl border border-emerald-900/40 flex flex-col gap-2 shadow-inner">
          <div class="flex items-center justify-between">
            <span class="text-[10px] uppercase text-emerald-400 font-extrabold tracking-widest">GENERATED COMMAND LINE</span>
            <button
              on:click={copyCommand}
              class="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-lg text-[10px] font-bold uppercase hover:bg-emerald-900 transition-colors"
            >
              {copiedCommand ? 'COPIED!' : '📋 COPY COMMAND'}
            </button>
          </div>
          <pre class="text-xs font-mono text-emerald-300 whitespace-pre-wrap break-all">{generatedCliCommand}</pre>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 bg-slate-900/90 border-t border-emerald-900/40 flex items-center justify-end gap-3">
        <button
          on:click={onClose}
          class="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors"
        >
          CLOSE
        </button>
        <button
          on:click={copyCommand}
          class="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all"
        >
          COPY & READY
        </button>
      </div>

    </div>
  </div>
{/if}
