import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';
import { BalanceDAO, IBalanceRepository } from '../balance.repository';

@Injectable()
export class PgBalanceRepository implements IBalanceRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(balance: BalanceDAO): Promise<void> {
    await this.prisma.balances.create({
      data: { wallet_id: balance.walletId, balance: balance.value },
    });
  }

  async find(walletId: string): Promise<number> {
    const result = await this.prisma.balances.findUnique({
      where: {
        wallet_id: walletId,
      },
    });
    return +result.balance;
  }
}
