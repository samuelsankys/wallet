import { Transaction, TransactionStatusEnum, TransactionTypeEnum } from '../domain/transaction';
import { TransactionDTO } from '../dtos/transaction.DTO';

export class TransactionMapper {
  public static toDTO(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      ...transaction.props,
    } as TransactionDTO;
  }

  static toDomain(raw: any): Transaction {
    const transactionOrError = Transaction.create(
      {
        eventId: raw.event_id,
        walletId: raw.wallet_id,
        type: raw.type as TransactionTypeEnum,
        amount: +raw.amount,
        afterBalance: +raw.after_balance,
        status: raw.status as TransactionStatusEnum,
        failingReason: raw.failing_reason,
        externalReference: raw.external_reference,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    );

    return transactionOrError;
  }

  static toPersistence(transaction: Transaction): any {
    return {
      id: transaction.id,
      event_id: transaction.eventId,
      wallet_id: transaction.walletId,
      external_reference: transaction.externalReference,
      failing_reason: transaction.failingReason,
      status: transaction.status,
      type: transaction.type,
      amount: transaction.amount ?? 0,
      after_balance: transaction.afterBalance ?? 0,
      created_at: transaction.createdAt,
      updated_at: transaction.updatedAt,
    };
  }
}
