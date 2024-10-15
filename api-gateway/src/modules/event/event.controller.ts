import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { EventRequest, EventResponse } from './event.DTO';

@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly clientTransaction: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Send event to transaction service' })
  @ApiResponse({ status: 200, type: EventResponse })
  async execute(@Body(new ValidationPipe()) event: EventRequest) {
    try {
      await firstValueFrom(this.clientTransaction.send('events', event));
      return {
        status: 'success',
        message: 'Event processed',
      };
    } catch (error) {
      console.error('Error processing event:', error);
      return {
        status: 'error',
        message: 'Failed to process event',
      };
    }
  }
}
