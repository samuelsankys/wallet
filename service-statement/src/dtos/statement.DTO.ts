export interface StatementDTO {
  id: string;
  walletId: string;
  transactionId: string;
  transactionType: string;
  transactionAt: Date;
  amount?: number;
  afterBalance?: number;
  externalReference?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
