import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventDTO } from '../../events/event.DTO';
import { TransactionRefundUseCase } from './transaction-refund.use-case';

@Injectable()
export class TransactionRefundListener {
  constructor(private readonly transactionRefundUseCase: TransactionRefundUseCase) {}

  @OnEvent('transaction.refund')
  handle(event: EventDTO) {
    try {
      const { walletId, eventId, metadata } = event;
      this.transactionRefundUseCase.execute({ eventId, walletId, referenceId: metadata.referenceId });
      return;
    } catch (error) {
      console.log({ error });
    }
  }
}
