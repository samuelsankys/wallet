export interface EventDAO {
  eventId: string;
  timestamp?: string;
  walletId: string;
  type: string;
  amount: number;
  source: string;
  metadata: object;
}

export abstract class IEventRepository {
  abstract save(event: EventDAO): Promise<void>;
  abstract exists(eventId: string): Promise<boolean>;
}
