import { EventDAO } from '../repositories/event.repository';

export class EventMapper {
  static toPersistence(event: EventDAO): any {
    return {
      id: event.eventId,
      wallet_id: event.walletId,
      type: event.type,
      amount: event.amount ?? 0,
      source: event.source,
      metadata: event.metadata ? JSON.stringify(event.metadata) : '{}',
      timestamp: event.timestamp,
    };
  }
}
