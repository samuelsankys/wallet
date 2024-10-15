import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { BalanceResponse } from './balance.DTO';

@Injectable()
export class BalanceService {
  constructor(
    @Inject('BALANCE_SERVICE')
    private readonly clientTransactionBalance: ClientProxy,
  ) {}

  async execute(walletId: string): Promise<BalanceResponse> {
    const balance: number = await firstValueFrom(
      this.clientTransactionBalance.send<number>('get_balance', walletId),
    );

    return { balance };
  }
}
