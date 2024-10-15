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
    await this.prisma.statements.create({
      data,
    });
    return;
  }

  async find(walletId: string): Promise<Statement[]> {
    const result = await this.prisma.statements.findMany({
      where: {
        wallet_id: walletId,
      },
    });
    return !!result?.length ? result.map(StatementMapper.toEntity) : null;
  }
}
