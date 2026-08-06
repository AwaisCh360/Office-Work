export interface Vulnerability {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  cvss_score?: number;
  owasp_category?: string;
  description: string;
  proof_of_concept?: string;
  remediation?: string;
  location?: string;
  timestamp?: string;
}

export interface Agent {
  id: string;
  name: string;
  parent_id?: string;
  status: 'idle' | 'running' | 'waiting' | 'completed' | 'failed' | 'crashed' | 'stopped';
  error_message?: string;
  created_at?: string;
  updated_at?: string;
  current_action?: string;
  turns?: number;
}

export interface AgentNodeData extends Agent {
  role: string;
}

export interface RunSummary {
  name: string;
  target: string;
  scan_mode?: string;
  status: string;
  start_time?: string;
  end_time?: string;
  finished: boolean;
  severity_counts: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
}

export interface RunDetail extends RunSummary {
  vulnerabilities: Vulnerability[];
  agents: AgentNodeData[];
  logs: string[];
}
