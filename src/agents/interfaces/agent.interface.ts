export enum AgentType {
  Sales = 'sales',
  Support = 'support',
  Marketing = 'marketing',
}

export enum AgentStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface IAgent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  description?: string;
  system?: boolean;
  createdAt: string;
}
export interface IAgentCreate {
  name: string;
  type: AgentType;
  description?: string;
  system?: boolean;
}
