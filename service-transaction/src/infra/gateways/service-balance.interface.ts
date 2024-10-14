export abstract class IBalanceService {
  abstract saveCurrentBalance(walletId: string, value: number): Promise<void>;
  abstract getCurrentBalance(walletId: string): Promise<number>;
}
