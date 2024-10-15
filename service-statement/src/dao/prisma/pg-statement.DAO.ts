import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';
import { IStatementDAO } from '../statement.DAO';
import { StatementMapper } from 'src/mapper/statement.map';
import { Statement } from 'src/entity/statement';

@Injectable()
export class PgStatementDAO implements IStatementDAO {
  constructor(private readonly prisma: PrismaService) {}

  async save(statement: Statement): Promise<void> {
    const data = StatementMapper.toPersistence(statement);
    console.log({ data });

    await this.prisma.statements.create({
      data,
    });
    return;
  }

  // async findById(statementId: string): Promise<Statement> {
  //   const result = await this.prisma.transactionHistory.findUnique({
  //     where: {
  //       id: transactionId,
  //     },
  //   });
  //   return !!result ? TransactionMapper.toDomain(result) : null;
  // }
}
