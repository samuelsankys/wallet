import { Injectable } from '@nestjs/common';
import { IStatementDAO } from 'src/dao/statement.DAO';
import { TransactionCompletedEvent } from './transaction-completed-event';
import { randomUUID } from 'crypto';
import { Statement } from './entity/statement';

@Injectable()
export class StatementService {
  constructor(private readonly statementDAO: IStatementDAO) {}

  async saveStatement(event: TransactionCompletedEvent): Promise<void> {
    const statement = {
      id: randomUUID(),
      transactionId: event.transactionId,
      walletId: event.walletId,
      transactionType: event.transactionType,
      transactionAt: new Date(event.transactionAt),
      amount: event.amount,
      status: event.status,
      afterBalance: event.afterBalance,
      externalReference: event.externalReference,
      createdAt: new Date(),
    };
    await this.statementDAO.save(statement);
  }

  async getStatement(walletId: string): Promise<Statement[]> {
    console.log({ walletId });

    const response = await this.statementDAO.find(walletId);
    console.log({ response });

    return response;
  }
}
