import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../transaction.repository';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';
import { TransactionMapper } from 'src/application/mapper/transaction.map';
import { Transaction } from 'src/application/domain/transaction';

@Injectable()
export class PgTransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(transaction: Transaction): Promise<Transaction> {
    const data = TransactionMapper.toPersistence(transaction);
    const result = await this.prisma.transactions.create({
      data,
    });

    return !!result ? TransactionMapper.toDomain({ ...result }) : null;
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const data = TransactionMapper.toPersistence(transaction);
    const result = await this.prisma.transactions.update({
      where: {
        id: transaction.id,
      },
      data,
    });
    return !!result ? TransactionMapper.toDomain({ ...result }) : null;
  }

  async findById(transactionId: string): Promise<Transaction> {
    const result = await this.prisma.transactions.findUnique({
      where: {
        id: transactionId,
      },
    });
    return !!result ? TransactionMapper.toDomain({ ...result, amount: +result.amount, afterBalance: +result.after_balance }) : null;
  }
}
