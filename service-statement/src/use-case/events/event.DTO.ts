export interface EventDTO {
  id: string;
  timeStamp?: string;
  walletId: string;
  type: string;
  amount: number;
  source: string;
  metadata: object;
}
