import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../../repositories/transaction.repository';
import { Transaction } from '../../../domain/transaction';
import { BalanceService } from 'src/infra/gateways/service-balance.interface';
import { TransactionDepositDTO } from './transaction-deposit.dto';

@Injectable()
export class TransactionDepositUseCase {
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

  public async execute(input: TransactionDepositDTO): Promise<void> {
    const { eventId, walletId, amount } = input;
    const currentBalance = await this.balanceService.getCurrentBalance(walletId);
    const transaction = Transaction.create({ walletId, eventId });

    try {
      transaction.deposit(amount, currentBalance);

      await this.balanceService.saveCurrentBalance(walletId, transaction.afterBalance);

      await this.transactionRepo.create(transaction);
    } catch (error) {
      await this.transactionRepo.create(transaction);
      await this.balanceService.saveCurrentBalance(walletId, currentBalance);
    }
  }
}
