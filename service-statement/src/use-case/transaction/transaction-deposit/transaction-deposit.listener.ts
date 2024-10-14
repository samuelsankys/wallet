import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { TransactionDepositUseCase } from './transaction-deposit.use-case';
import { EventDTO } from '../../events/event.DTO';

@Injectable()
export class TransactionDepositListener {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly transactionDepositUseCase: TransactionDepositUseCase,
  ) {
    this.setupListener();
  }

  private setupListener() {
    this.eventEmitter.on('transaction.deposit', this.handle.bind(this));
  }

  private handle(event: EventDTO) {
    const { amount, walletId } = event;
    this.transactionDepositUseCase.execute({ eventId: event.id, amount, walletId });
  }
}
