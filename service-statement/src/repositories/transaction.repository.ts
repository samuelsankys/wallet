import { Transaction } from '../domain/transaction';

export abstract class ITransactionRepository {
  abstract create(transaction: Transaction): Promise<Transaction>;
  abstract findById(transactionId: string): Promise<Transaction>;
}
