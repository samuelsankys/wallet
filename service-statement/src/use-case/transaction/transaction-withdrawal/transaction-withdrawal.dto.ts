export interface TransactionWithdrawalDTO {
  transactionId: string;
  walletId: string;
  amount: number;
  operationType: string;
  transactionExternalId?: string;
}
