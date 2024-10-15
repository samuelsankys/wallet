import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventDTO } from '../../events/event.DTO';
import { TransactionReversalUseCase } from './transaction-reversal.use-case';

@Injectable()
export class TransactionReversalListener {
  constructor(private readonly transactionRefundUseCase: TransactionReversalUseCase) {}

  @OnEvent('transaction.reversal')
  handle(event: EventDTO) {
    console.log('event', event);

    try {
      const { walletId, eventId, metadata } = event;
      this.transactionRefundUseCase.execute({ eventId, walletId, referenceId: metadata.referenceId });
      return;
    } catch (error) {
      console.log({ error });
    }
  }
}
