import { Module } from '@nestjs/common';
import { StatementController } from './statement.controller';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';
import { StatementService } from './statement.service';
import { IStatementDAO } from 'src/dao/statement.DAO';
import { PgStatementDAO } from 'src/dao/prisma/pg-statement.DAO';

@Module({
  imports: [],
  controllers: [StatementController],
  providers: [
    PrismaService,
    StatementService,
    { provide: IStatementDAO, useClass: PgStatementDAO },
  ],
  exports: [StatementService],
})
export class StatementModule {}
