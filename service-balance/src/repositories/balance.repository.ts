export interface BalanceDAO {
  walletId: string;
  value: number;
}

export abstract class IBalanceRepository {
  abstract save(walletId: string, value: number): Promise<void>;
  abstract find(walletId: string): Promise<number>;
}
