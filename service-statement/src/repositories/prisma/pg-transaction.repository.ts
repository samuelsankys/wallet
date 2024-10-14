import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../transaction.repository';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';
import { Transaction } from 'src/application/domain/transaction';
import { TransactionMapper } from 'src/application/mapper/transaction.map';

@Injectable()
export class PgTransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(transaction: Transaction): Promise<Transaction> {
    const data = TransactionMapper.toPersistence(transaction);
    const result = await this.prisma.transactionHistory.create({
      data,
    });
    return !!result ? TransactionMapper.toDomain(result) : null;
  }

  async findById(transactionId: string): Promise<Transaction> {
    const result = await this.prisma.transactionHistory.findUnique({
      where: {
        id: transactionId,
      },
    });
    return !!result ? TransactionMapper.toDomain(result) : null;
  }
}
