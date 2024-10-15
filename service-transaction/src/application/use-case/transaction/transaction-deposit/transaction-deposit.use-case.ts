import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../../repositories/transaction.repository';
import { TransactionDepositDTO } from './transaction-deposit.dto';
import { Transaction } from 'src/application/domain/transaction';
import { IBalanceService } from 'src/infra/gateways/service-balance.interface';

@Injectable()
export class TransactionDepositUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly balanceService: IBalanceService,
  ) {}

  public async execute(input: TransactionDepositDTO): Promise<void> {
    const { eventId, walletId, amount } = input;

    const currentBalance = await this.balanceService.getCurrentBalance(walletId);
    const transaction = Transaction.create({ walletId, eventId });

    try {
      transaction.deposit(amount, currentBalance);
      await this.balanceService.saveCurrentBalance(walletId, transaction.afterBalance);

      await this.transactionRepo.create(transaction);
    } catch (error) {
      console.log({ error });

      await this.transactionRepo.create(transaction);
      await this.balanceService.saveCurrentBalance(walletId, currentBalance);
    }
  }
}
