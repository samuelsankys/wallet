import { Transaction, TransactionStatusEnum, TransactionTypeEnum } from '../domain/transaction';
import { TransactionDTO } from '../dtos/transaction.DTO';

export class TransactionMapper {
  public static toDTO(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      ...transaction.props,
    } as TransactionDTO;
  }

  static toDomain(dto: TransactionDTO): Transaction {
    const transactionOrError = Transaction.create(
      {
        eventId: dto.eventId,
        walletId: dto.walletId,
        type: dto.type as TransactionTypeEnum,
        amount: +dto.amount,
        afterBalance: +dto.afterBalance,
        status: dto.status as TransactionStatusEnum,
        failingReason: dto.failingReason,
        externalReference: dto.externalReference,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
      },
      dto.id,
    );

    return transactionOrError;
  }

  static toPersistence(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      ...transaction.props,
      externalReference: transaction.externalReference,
      failingReason: transaction.failingReason,
      status: transaction.status,
      type: transaction.type,
      amount: transaction.amount ?? 0,
      afterBalance: transaction.afterBalance ?? 0,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    } as TransactionDTO;
  }
}
