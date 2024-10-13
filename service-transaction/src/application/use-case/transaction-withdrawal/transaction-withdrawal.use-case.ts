import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../repositories/transaction.repository';
import { Transaction } from '../../domain/transaction';
import { BalanceService } from 'src/infra/gateways/service-balance.interface';
import { TransactionWithdrawalDTO } from './transaction-withdrawal.dto';

@Injectable()
export class TransactionWithdrawalUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly balanceService: BalanceService,
  ) {}

  //fazer um deposito com sucesso
  // fazer um deposito com erro
  // escolher um tipo de operação errada
  // dar erro ao salvar no redis
  // dar erro ao salvar no banco
  // verificar se a transação já foi realizada
  // fazer uma transação de sucesso de compra
  // fazer uma transação de cancelamento de compra
  // fazer uma transaçao de reversão de operação

  public async execute(input: TransactionWithdrawalDTO): Promise<void> {
    const { transactionId, walletId, amount } = input;
    const currentBalance = await this.balanceService.getCurrentBalance(walletId);
    const transaction = Transaction.create({ walletId: walletId }, transactionId);

    const alreadyTransaction = await this.transactionRepo.findById(transactionId);
    if (alreadyTransaction) throw Error('transaction already exists');

    try {
      transaction.withdrawal(amount, currentBalance);

      await this.balanceService.saveCurrentBalance(walletId, transaction.afterBalance);

      await this.transactionRepo.create(transaction);
    } catch (error) {
      await this.transactionRepo.create(transaction);
      await this.balanceService.saveCurrentBalance(walletId, currentBalance);
    }
  }
}
