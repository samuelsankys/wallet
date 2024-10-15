import { Statement } from 'src/entity/statement';

export class StatementMapper {
  public static toEntity(raw: any): Statement {
    return {
      status: raw.status,
      afterBalance: raw.after_balance,
      amount: raw.amount,
      externalReference: raw.external_reference,
      id: raw.id,
      transactionAt: raw.transaction_at,
      transactionId: raw.transaction_id,
      walletId: raw.wallet_id,
      transactionType: raw.transaction_type,
    };
  }

  public static toDTO(statement: Statement) {
    return {
      ...statement,
    };
  }

  static toPersistence(statement: Statement): any {
    return {
      id: statement.id,
      transaction_id: statement.transactionId,
      wallet_id: statement.walletId,
      transaction_type: statement.transactionType,
      amount: statement.amount,
      status: statement.status,
      transaction_at: statement.transactionAt,
      after_balance: statement.afterBalance,
      external_reference: statement.externalReference,
      created_at: new Date(),
    };
  }
}
