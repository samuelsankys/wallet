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
  async execute(@Body() event: EventDTO): Promise<string> {
    const resultA = await firstValueFrom(
      this.clientTransaction.send('events', event),
    );
    return this.eventService.transaction(resultA);
  }
}
