export class Statement {
  id: string;
  transactionId: string;
  walletId: string;
  transactionType: string;
  transactionAt: Date;
  amount: number;
  status: string;
  afterBalance: number;
  externalReference: string;
}
