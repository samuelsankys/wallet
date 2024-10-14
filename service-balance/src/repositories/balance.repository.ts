export interface BalanceDAO {
  walletId: string;
  value: number;
}

export abstract class IBalanceRepository {
  abstract save(balance: BalanceDAO): Promise<void>;
  abstract find(walletId: string): Promise<number>;
}
