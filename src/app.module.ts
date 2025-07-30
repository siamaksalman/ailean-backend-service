import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentsModule } from './agents/agents.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AgentsModule],
})
export class AppModule {}
