import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { AgentsService } from './agents.service';
import { IAgent } from './interfaces/agent.interface';
import { askAgentDto, askAgentResponseDto, newAgentDto } from './dto';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}
  @Get()
  getAgents(): IAgent[] {
    return this.agentsService.getAgents();
  }

  @Get(':id/')
  @ApiParam({
    name: 'id',
    description: 'The ID of the agent to ask',
    example: '79aee158-3a52-4f17-aaec-4e268c0ec8d1',
  })
  getAgent(@Param('id') id: string): IAgent {
    return this.agentsService.getAgent(id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    example: {
      id: '79aee158-3a52-4f17-aaec-4e268c0ec8d2',
      name: 'Hotel Q&A Agent',
      type: 'Support',
      satisfies: 'Active',
      description: 'An agent that answers questions about the hotel.',
    },
  })
  insertAgent(@Body() newAgentDto: newAgentDto): IAgent {
    return this.agentsService.insertAgent(newAgentDto);
  }

  @Post(':id/ask')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    example: {
      role: 'assistant',
      content: 'Check-in starts at 3 PM.',
    },
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the agent to ask',
    example: '79aee158-3a52-4f17-aaec-4e268c0ec8d1',
  })
  askAgent(
    @Body() askAgentDto: askAgentDto,
    @Param('id') id: string,
  ): askAgentResponseDto {
    const resp = this.agentsService.askAgent(id, askAgentDto.qeustion);
    return {
      role: 'assistant',
      content: resp,
    };
  }
}
