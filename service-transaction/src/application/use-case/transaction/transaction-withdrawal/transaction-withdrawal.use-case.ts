import { Injectable } from '@nestjs/common';
import { TransactionWithdrawalDTO } from './transaction-withdrawal.dto';
import { ITransactionRepository } from 'src/application/repositories/transaction.repository';
import { Transaction } from 'src/application/domain/transaction';
import { IBalanceService } from 'src/infra/gateways/service-balance.interface';

@Injectable()
export class TransactionWithdrawalUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly balanceService: IBalanceService,
  ) {}

  public async execute(input: TransactionWithdrawalDTO): Promise<void> {
    const { walletId, amount, eventId } = input;
    const currentBalance = await this.balanceService.getCurrentBalance(walletId);
    const transaction = Transaction.create({ walletId, eventId });

    try {
      transaction.withdrawal(amount, currentBalance);
      console.log({ transaction });

      await this.balanceService.saveCurrentBalance(walletId, transaction.afterBalance);

      await this.transactionRepo.create(transaction);
    } catch (error) {
      console.log(error);
      await this.transactionRepo.create(transaction);
      await this.balanceService.saveCurrentBalance(walletId, currentBalance);
    }
  }
}
