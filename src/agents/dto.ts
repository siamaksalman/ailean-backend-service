import { ApiProperty } from '@nestjs/swagger';
import { AgentStatus, AgentType } from './interfaces/agent.interface';
export class askAgentDto {
  @ApiProperty({
    description: 'The question to ask the agent',
    example: 'What time is check-in?',
  })
  qeustion: string;
}

export class askAgentResponseDto {
  role: string;
  content: string;
}

export class newAgentDto {
  @ApiProperty({
    description: 'The name of the agent',
    example: 'Test Agent',
  })
  name: string;

  @ApiProperty({
    description: 'The type of the agent',
    example: 'Sales',
  })
  type: AgentType;

  @ApiProperty({
    description: 'The status of the agent',
    example: 'Active',
  })
  status: AgentStatus;

  @ApiProperty({
    description: 'A brief description of the agent',
    example: 'An agent that answers questions about the test.',
  })
  description: string;
}

export class newAgentResponseDto {
  id: string;
  name: string;
  type: string;
  description: string;
}
