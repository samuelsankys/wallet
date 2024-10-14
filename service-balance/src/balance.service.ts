import { Injectable } from '@nestjs/common';
import { IBalanceRepository } from './repositories/balance.repository';

@Injectable()
export class BalanceService {
  constructor(private readonly balanceRepository: IBalanceRepository) {}

  async saveBalance(walletId: string, value: number): Promise<void> {
    await this.balanceRepository.save({ walletId, value });
  }

  async getBalance(walletId: string): Promise<number> {
    const response = await this.balanceRepository.find(walletId);
    return response;
  }
}
