import { Injectable } from '@nestjs/common';
import { ICache } from 'src/infra/cache/cache/cache.interface';

export abstract class IWalletService {
  abstract saveCurrentBalance(walletId: string, value: number): Promise<void>;
  abstract getCurrentBalance(walletId: string): Promise<number>;
}

@Injectable()
export class WalletService implements IWalletService {
  constructor(private readonly cacheClient: ICache) {}

  async saveCurrentBalance(walletId: string, value: number): Promise<void> {
    const redisKey = `wallet:balance:${walletId}`;
    await this.cacheClient.set(redisKey, value);
  }

  async getCurrentBalance(walletId: string): Promise<number> {
    const redisKey = `wallet:balance:${walletId}`;
    const balance = await this.cacheClient.get<number>(redisKey);
    return balance !== null ? balance : 0;
  }
}
