import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { IBalanceRepository } from './repositories/balance.repository';
import { PgBalanceRepository } from './repositories/prisma/pg-balance.repository';
import { PrismaService } from './infra/database/prisma/prisma-connection';

@Module({
  imports: [],
  controllers: [BalanceController],
  providers: [
    PrismaService,
    BalanceService,
    { provide: IBalanceRepository, useClass: PgBalanceRepository },
  ],
  exports: [BalanceService],
})
export class BalanceModule {}
