import { Transaction, TransactionStatusEnum, TransactionTypeEnum } from '../domain/transaction';
import { TransactionDTO } from '../dtos/transaction.DTO';

export class TransactionMapper {
  public static toDTO(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      ...transaction.props,
    };
  }

  static toDomain(raw: TransactionDTO): Transaction {
    const transactionOrError = Transaction.create(
      {
        walletId: raw.walletId,
        type: raw.type as TransactionTypeEnum,
        amount: +raw.amount,
        afterBalance: +raw.afterBalance,
        status: raw.status as TransactionStatusEnum,
        failingReason: raw.failingReason,
        externalReference: raw.externalReference,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );

    return transactionOrError;
  }

  static toPersistence(transaction: Transaction) {
    return {
      ...transaction.props,
    };
  }
}
