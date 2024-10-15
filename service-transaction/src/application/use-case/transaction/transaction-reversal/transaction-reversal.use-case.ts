import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from 'src/application/repositories/transaction.repository';
import { Transaction } from 'src/application/domain/transaction';
import { IBalanceService } from 'src/infra/gateways/service-balance.interface';
import { TransactionReversalDTO } from './transaction-reversal.dto';

@Injectable()
export class TransactionReversalUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly balanceService: IBalanceService,
  ) {}

  public async execute(input: TransactionReversalDTO): Promise<void> {
    console.log('input', input);

    const { walletId, eventId, referenceId } = input;
    if (!referenceId) throw new Error('Reversal transaction reference is required.');
    const currentBalance = await this.balanceService.getCurrentBalance(walletId);
    console.log('currentBalance', currentBalance);

    const previousTransaction = await this.transactionRepo.findById(referenceId);
    if (!previousTransaction) throw new Error('Transaction not found.');

    console.log('previousTransaction', previousTransaction);

    const transaction = Transaction.create({ walletId, eventId });

    try {
      transaction.reversal(previousTransaction, currentBalance);

      previousTransaction.cancelTransaction();
      await this.balanceService.saveCurrentBalance(walletId, transaction.afterBalance);

      await Promise.all([this.transactionRepo.create(transaction), this.transactionRepo.update(previousTransaction)]);
    } catch (error) {
      console.log({ error });
      console.log({ transaction });
      await Promise.all([this.transactionRepo.create(transaction), this.balanceService.saveCurrentBalance(walletId, currentBalance)]);
    }
  }
}
