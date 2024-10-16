import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventHandler } from './event.handler';
import { EventDTO } from './event.DTO';

@Controller()
export class EventController {
  constructor(private readonly eventHandler: EventHandler) {}

  @MessagePattern('events')
  execute(@Body() event: EventDTO) {
    return this.eventHandler.handle(event);
  }
}
