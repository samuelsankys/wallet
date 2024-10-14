import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { EventService } from './event.service';

export interface EventDTO {
  eventId: string;
  timeStamp?: string;
  walletId: string;
  type: string;
  amount: number;
  source: string;
  metadata: object;
}

@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    @Inject('EVENT_SERVICE')
    private readonly clientTransaction: ClientProxy,
  ) {}

  @Post()
  async execute(@Body() event: EventDTO) {
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
