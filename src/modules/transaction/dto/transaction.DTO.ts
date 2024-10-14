export interface TransactionDTO {
  id: string;
  walletId: string;
  type?: string;
  amount?: number;
  afterBalance?: number;
  status?: string;
  failingReason?: string;
  externalReference?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
