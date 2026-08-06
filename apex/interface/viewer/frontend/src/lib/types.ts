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

export interface AgentNodeData {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  current_action?: string;
  turns: number;
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
