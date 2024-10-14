export interface TransactionWithdrawalDTO {
  transactionId: string;
  eventId: string;
  walletId: string;
  amount: number;
  operationType: string;
  transactionExternalId?: string;
}
