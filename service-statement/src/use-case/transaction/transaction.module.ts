import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';
import { TransactionDepositUseCase } from './transaction-deposit/transaction-deposit.use-case';
import { TransactionWithdrawalUseCase } from './use-case/transaction/transaction-deposit/transaction-withdrawal/transaction-withdrawal.use-case';
import { ITransactionRepository } from '../../repositories/transaction.repository';
import { PgTransactionRepository } from '../../repositories/prisma/pg-transaction.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    TransactionDepositUseCase,
    TransactionWithdrawalUseCase,
    {
      provide: ITransactionRepository,
      useClass: PgTransactionRepository,
    },
  ],
})
export class TransactionModule {}
