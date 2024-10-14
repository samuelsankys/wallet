import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';
import { TransactionDepositUseCase } from './transaction-deposit/transaction-deposit.use-case';
import { ITransactionRepository } from '../../repositories/transaction.repository';
import { PgTransactionRepository } from '../../repositories/prisma/pg-transaction.repository';
import { TransactionWithdrawalUseCase } from './transaction-withdrawal/transaction-withdrawal.use-case';
import { TransactionDepositListener } from './transaction-deposit/transaction-deposit.listener';
import { TransactionCreatedHandler } from './transaction-deposit/transaction-deposited.handler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BalanceModule } from 'src/infra/gateways/balance.module';

@Module({
  imports: [EventEmitterModule.forRoot(), BalanceModule],
  controllers: [],
  providers: [
    PrismaService,
    TransactionDepositUseCase,
    TransactionWithdrawalUseCase,
    TransactionDepositListener,
    TransactionCreatedHandler,
    { provide: ITransactionRepository, useClass: PgTransactionRepository },
  ],
})
export class TransactionModule {}
