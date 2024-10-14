export abstract class BalanceService {
  abstract saveCurrentBalance(walletId: string, value: number): Promise<void>;
  abstract getCurrentBalance(walletId: string): Promise<number>;
}
