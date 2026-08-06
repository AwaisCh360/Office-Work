import type { RunSummary, RunDetail } from './types';

export async function fetchRuns(): Promise<RunSummary[]> {
  try {
    const res = await fetch('/api/runs');
    if (!res.ok) return [];
    const data = await res.json();
    return data.runs || [];
  } catch (err) {
    console.error('Failed to fetch runs:', err);
    return [];
  }
}

export async function fetchRunDetail(name: string): Promise<RunDetail | null> {
  try {
    const res = await fetch(`/api/runs/${encodeURIComponent(name)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch run ${name}:`, err);
    return null;
  }
}

export async function sendSteering(name: string, instruction: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/runs/${encodeURIComponent(name)}/steer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instruction })
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to send steering:', err);
    return false;
  }
}
