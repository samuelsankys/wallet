import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';
import { BalanceDAO, IBalanceRepository } from '../balance.repository';

@Injectable()
export class PgBalanceRepository implements IBalanceRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(balance: BalanceDAO): Promise<void> {
    const result = await this.prisma.balances.findUnique({
      where: {
        wallet_id: balance.walletId,
      },
    });
    if (result) {
      await this.prisma.balances.update({
        where: {
          wallet_id: balance.walletId,
        },
        data: {
          balance: balance.value,
        },
      });
    } else {
      await this.prisma.balances.create({
        data: { wallet_id: balance.walletId, balance: balance.value },
      });
    }
  }

  async find(walletId: string): Promise<number> {
    const result = await this.prisma.balances.findUnique({
      where: {
        wallet_id: walletId,
      },
    });
    return result ? +result.balance : 0;
  }
}
