import { BalanceService } from './service-balance.interface';

export class MockBalanceService extends BalanceService {
  private balances: Map<string, number> = new Map();

  async saveCurrentBalance(walletId: string, value: number): Promise<void> {
    this.balances.set(walletId, value);
  }

  async getCurrentBalance(walletId: string): Promise<number> {
    return this.balances.get(walletId) || 0; // Retorna 0 se o saldo não for encontrado
  }
}
