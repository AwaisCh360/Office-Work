<script lang="ts">
  import { sendSteering } from '../api';

  export let runName: string = '';
  export let isOpen: boolean = false;
  export let onClose: () => void = () => {};

  let instruction: string = '';
  let isSending: boolean = false;
  let successMsg: string = '';
  let errorMsg: string = '';

  async function handleSubmit() {
    if (!instruction.trim() || !runName) return;
    isSending = true;
    successMsg = '';
    errorMsg = '';

    const ok = await sendSteering(runName, instruction);
    isSending = false;

    if (ok) {
      successMsg = 'Instruction sent to live agents!';
      instruction = '';
      setTimeout(() => {
        onClose();
        successMsg = '';
      }, 1200);
    } else {
      errorMsg = 'Failed to deliver instruction to scan.';
    }
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
    <div class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-slate-100 flex items-center gap-2">
          <span>🎯 Steer Live Agents</span>
        </h3>
        <button on:click={onClose} class="text-slate-400 hover:text-slate-200">✕</button>
      </div>

      <p class="text-xs text-slate-400">
        Redirect active agents mid-scan (e.g. "Focus on auth bypass in `/login`", "Check JWT expiration logic").
      </p>

      <textarea
        bind:value={instruction}
        placeholder="Enter custom instruction for live agents..."
        rows="4"
        class="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
      ></textarea>

      {#if successMsg}
        <p class="text-xs text-emerald-400 bg-emerald-950/50 p-2 rounded border border-emerald-800">{successMsg}</p>
      {/if}

      {#if errorMsg}
        <p class="text-xs text-rose-400 bg-rose-950/50 p-2 rounded border border-rose-800">{errorMsg}</p>
      {/if}

      <div class="flex items-center justify-end gap-3 pt-2">
        <button on:click={onClose} class="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 font-mono">Cancel</button>
        <button
          on:click={handleSubmit}
          disabled={isSending || !instruction.trim()}
          class="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold rounded-lg text-xs font-mono transition-colors"
        >
          {isSending ? 'Sending...' : 'Send Steering Instruction'}
        </button>
      </div>
    </div>
  </div>
{/if}
