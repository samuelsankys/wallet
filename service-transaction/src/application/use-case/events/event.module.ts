import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventHandler } from './event.handler';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [EventController],
  providers: [EventHandler],
})
export class EventModule {}
