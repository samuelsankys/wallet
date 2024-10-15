import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';
import { TransactionDepositUseCase } from './transaction-deposit/transaction-deposit.use-case';
import { ITransactionRepository } from '../../repositories/transaction.repository';
import { PgTransactionRepository } from '../../repositories/prisma/pg-transaction.repository';
import { TransactionWithdrawalUseCase } from './transaction-withdrawal/transaction-withdrawal.use-case';
import { TransactionDepositListener } from './transaction-deposit/transaction-deposit.listener';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BalanceModule } from 'src/infra/gateways/balance.module';
import { TransactionCreatedHandler } from './transaction-deposited.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionWithdrawalListener } from './transaction-withdrawal/transaction-withdrawal.listener';
import { TransactionPurchaseListener } from './transaction-purchase/transaction-purchase.listener';
import { TransactionPurchaseUseCase } from './transaction-purchase/transaction-purchase.use-case';
import { TransactionRefundListener } from './transaction-refund/transaction-refund.listener';
import { TransactionRefundUseCase } from './transaction-refund/transaction-refund.use-case';
import { TransactionReversalListener } from './transaction-reversal/transaction-reversal.listener';
import { TransactionReversalUseCase } from './transaction-reversal/transaction-reversal.use-case';

@Module({
  imports: [CqrsModule, EventEmitterModule.forRoot(), BalanceModule],
  controllers: [],
  providers: [
    PrismaService,
    TransactionDepositUseCase,
    TransactionWithdrawalUseCase,
    TransactionPurchaseUseCase,
    TransactionRefundUseCase,
    TransactionReversalUseCase,

    TransactionDepositListener,
    TransactionWithdrawalListener,
    TransactionRefundListener,
    TransactionPurchaseListener,
    TransactionReversalListener,

    TransactionCreatedHandler,
    { provide: ITransactionRepository, useClass: PgTransactionRepository },
  ],
  exports: [TransactionCreatedHandler],
})
export class TransactionModule {}
