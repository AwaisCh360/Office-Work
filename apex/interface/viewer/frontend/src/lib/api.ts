import type { RunSummary, RunDetail, Agent, Vulnerability } from './types';

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
    const res = await fetch(`/api/run?run=${encodeURIComponent(name)}`);
    if (!res.ok) {
      const fallbackRes = await fetch(`/api/runs/${encodeURIComponent(name)}`);
      if (!fallbackRes.ok) return null;
      return await fallbackRes.json();
    }
    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch run ${name}:`, err);
    return null;
  }
}

export async function fetchRunState(name: string): Promise<{ agents: Agent[]; events: any[] }> {
  try {
    const res = await fetch(`/api/state?run=${encodeURIComponent(name)}`);
    if (!res.ok) return { agents: [], events: [] };
    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch state for ${name}:`, err);
    return { agents: [], events: [] };
  }
}

export async function fetchVulnerabilities(name: string): Promise<Vulnerability[]> {
  try {
    const res = await fetch(`/api/vulnerabilities?run=${encodeURIComponent(name)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.vulnerabilities || []);
  } catch (err) {
    console.error(`Failed to fetch vulnerabilities for ${name}:`, err);
    return [];
  }
}

export async function fetchReport(name: string): Promise<string> {
  try {
    const res = await fetch(`/api/report?run=${encodeURIComponent(name)}`);
    if (!res.ok) return '';
    return await res.text();
  } catch (err) {
    console.error(`Failed to fetch report for ${name}:`, err);
    return '';
  }
}

export async function sendSteering(name: string, instruction: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/agents/steer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ run_name: name, instruction })
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to send steering:', err);
    return false;
  }
}
