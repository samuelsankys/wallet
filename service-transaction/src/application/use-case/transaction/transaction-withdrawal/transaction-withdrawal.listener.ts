import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventDTO } from '../../events/event.DTO';
import { TransactionWithdrawalUseCase } from './transaction-withdrawal.use-case';

@Injectable()
export class TransactionWithdrawalListener {
  constructor(private readonly transactionWithdrawalUseCase: TransactionWithdrawalUseCase) {}

  @OnEvent('transaction.withdrawal')
  handle(event: EventDTO) {
    try {
      this.transactionWithdrawalUseCase.execute(event);
      return;
    } catch (error) {
      console.log({ error });
    }
  }
}
