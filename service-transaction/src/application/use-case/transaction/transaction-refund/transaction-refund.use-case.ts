import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from 'src/application/repositories/transaction.repository';
import { Transaction } from 'src/application/domain/transaction';
import { IBalanceService } from 'src/infra/gateways/service-balance.interface';
import { TransactionRefundDTO } from './transaction-refund.dto';

@Injectable()
export class TransactionRefundUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly balanceService: IBalanceService,
  ) {}

  public async execute(input: TransactionRefundDTO): Promise<void> {
    const { walletId, eventId, referenceId } = input;
    if (!referenceId) throw new Error('Refund transaction reference is required.');
    const currentBalance = await this.balanceService.getCurrentBalance(walletId);
    const purchaseTransaction = await this.transactionRepo.findById(referenceId);
    if (!purchaseTransaction) throw new Error('Purchase transaction not found.');

    const transaction = Transaction.create({ walletId, eventId });

    try {
      transaction.refund(purchaseTransaction, currentBalance);
      await this.balanceService.saveCurrentBalance(walletId, transaction.afterBalance);

      await this.transactionRepo.create(transaction);
    } catch (error) {
      console.log(error);
      await this.transactionRepo.create(transaction);
      await this.balanceService.saveCurrentBalance(walletId, currentBalance);
    }
  }
}
