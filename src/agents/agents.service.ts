import { Injectable } from '@nestjs/common';
import { AgentStatus, AgentType, IAgent } from './interfaces/agent.interface';
import Fuse from 'fuse.js';
import qa from './qa.json';

const db: IAgent[] = [
  {
    id: '79aee158-3a52-4f17-aaec-4e268c0ec8d1',
    name: 'Hotel Q&A Agent',
    type: AgentType.Support,
    status: AgentStatus.Active,
    description: 'An agent that answers questions about the hotel.',
    system: true,
    createdAt: new Date().toISOString(),
  },
];

@Injectable()
export class AgentsService {
  getAgents(): IAgent[] {
    return db;
  }
  getAgent(id: string): IAgent {
    return db.find((agent) => agent.id === id);
  }

  insertAgent(agent: Omit<IAgent, 'id' | 'createdAt'>): IAgent {
    const newAgent: IAgent = {
      ...agent,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    db.push(newAgent);
    return newAgent;
  }

  askAgent(id: string, question: string): string {
    const agent = this.getAgent(id);
    if (!agent) {
      throw new Error('Agent not found');
    }
    if (!agent.system) {
      throw new Error('This agent is not a system agent');
    }

    /* eslint-disable */
    const fuse = new Fuse (qa, { 
      includeScore: true,
      ignoreLocation: true,
      useExtendedSearch: true,
      threshold: 0.4,
      keys: ['question', 'tags'],
    })

    const result = fuse.search(question);
    if (result.length > 0) {
      return result[0].item.answer;
    }
    /* eslint-enable */
    return "I don't know the answer to that question.";
  }
}
