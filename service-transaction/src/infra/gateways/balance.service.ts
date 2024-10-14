import { ClientProxy } from '@nestjs/microservices';
import { IBalanceService } from './service-balance.interface';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

export class BalanceService extends IBalanceService {
  constructor(@Inject('BALANCE_SERVICE') private readonly clientTransaction: ClientProxy) {
    super();
  }

  async saveCurrentBalance(walletId: string, value: number): Promise<void> {
    await firstValueFrom(this.clientTransaction.emit('save_balance', { walletId, value }));
  }

  async getCurrentBalance(walletId: string): Promise<number> {
    const balance = await firstValueFrom(this.clientTransaction.send<number>('get_balance', { walletId }));

    return balance || 0;
  }
}
