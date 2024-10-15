import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from 'src/application/repositories/transaction.repository';
import { Transaction } from 'src/application/domain/transaction';
import { IBalanceService } from 'src/infra/gateways/service-balance.interface';
import { TransactionPurchaseDTO } from './transaction-purchase.dto';

@Injectable()
export class TransactionPurchaseUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly balanceService: IBalanceService,
  ) {}

  public async execute(input: TransactionPurchaseDTO): Promise<void> {
    const { walletId, amount, eventId, referenceId } = input;
    const currentBalance = await this.balanceService.getCurrentBalance(walletId);
    const transaction = Transaction.create({ walletId, eventId });

    try {
      transaction.purchase(amount, currentBalance, referenceId);
      await this.balanceService.saveCurrentBalance(walletId, transaction.afterBalance);

      await this.transactionRepo.create(transaction);
    } catch (error) {
      console.log(error);
      await this.transactionRepo.create(transaction);
      await this.balanceService.saveCurrentBalance(walletId, currentBalance);
    }
  }
}
