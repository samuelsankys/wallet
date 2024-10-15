import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';
import { IBalanceRepository } from '../balance.repository';

@Injectable()
export class PgBalanceRepository implements IBalanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(walletId: string, value: number): Promise<void> {
    const result = await this.prisma.balances.findUnique({
      where: {
        wallet_id: walletId,
      },
    });
    if (result) {
      await this.prisma.balances.update({
        where: {
          wallet_id: walletId,
        },
        data: {
          balance: value,
        },
      });
    } else {
      await this.prisma.balances.create({
        data: { wallet_id: walletId, balance: value },
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
