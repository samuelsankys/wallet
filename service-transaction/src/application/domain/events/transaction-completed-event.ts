export class TransactionCompletedEvent {
  constructor(
    public readonly transactionId: string,
    public readonly transactionType: string,
    public readonly amount: number,
    public readonly afterBalance: number,
  ) {}
}
