export interface EventDTO {
  eventId: string;
  timeStamp?: string;
  walletId: string;
  type: string;
  amount: number;
  source: string;
  metadata: any;
}
