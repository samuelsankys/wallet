import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../repositories/transaction.repository';
import { MakeDepositOrWithdrawalDTO } from './make-deposit-or-withdrawal.dto';
import { Transaction, TransactionTypeEnum } from '../../domain/transaction';

@Injectable()
export class MakeDepositOrWithdrawalUseCase {
  constructor(private readonly transactionRepo: ITransactionRepository) {}

  public async execute(input: MakeDepositOrWithdrawalDTO): Promise<any> {
    const currentBalance = 100;
    const transactionOrError = Transaction.create({
      walletId: input.walletId,
    });

    if (input.operationType === TransactionTypeEnum.Deposit) {
      transactionOrError.deposit(input.amount, currentBalance);
    }
    if (input.operationType === TransactionTypeEnum.Withdrawal) {
      transactionOrError.withdrawal(input.amount, currentBalance);
    }

    const transaction = this.transactionRepo.create(transactionOrError);
  }
}
