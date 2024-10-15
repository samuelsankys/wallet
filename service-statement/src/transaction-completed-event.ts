export class TransactionCompletedEvent {
  constructor(
    public readonly transactionId: string,
    public readonly walletId: string,
    public readonly transactionType: string,
    public readonly transactionAt: string,
    public readonly amount: number,
    public readonly status: string,
    public readonly afterBalance: number,
    public readonly externalReference: string,
  ) {}
}
