import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Statement, StatementResponse } from './statement.DTO';

@Injectable()
export class StatementService {
  constructor(
    @Inject('STATEMENT_SERVICE')
    private readonly clientTransaction: ClientProxy,
    @Inject('BALANCE_SERVICE')
    private readonly clientTransactionBalance: ClientProxy,
  ) {}

  async execute(walletId: string): Promise<StatementResponse> {
    const statement: Statement[] = await firstValueFrom(
      this.clientTransaction.send<Statement[]>('statement.get', walletId),
    );

    const balance: number = await firstValueFrom(
      this.clientTransactionBalance.send<number>('get_balance', walletId),
    );

    return { balance, statement };
  }
}
