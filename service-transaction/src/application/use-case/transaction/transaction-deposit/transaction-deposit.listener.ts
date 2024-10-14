import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TransactionDepositUseCase } from './transaction-deposit.use-case';
import { EventDTO } from '../../events/event.DTO';

@Injectable()
export class TransactionDepositListener {
  constructor(private readonly transactionDepositUseCase: TransactionDepositUseCase) {}

  @OnEvent('transaction.deposited')
  handle(event: EventDTO) {
    const { amount, walletId } = event;
    this.transactionDepositUseCase.execute({ eventId: event.id, amount, walletId });
    return { ok: 'ok' };
  }
}
