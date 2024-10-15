import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventDTO } from '../../events/event.DTO';
import { TransactionPurchaseUseCase } from './transaction-purchase.use-case';

@Injectable()
export class TransactionPurchaseListener {
  constructor(private readonly transactionPurchaseUseCase: TransactionPurchaseUseCase) {}

  @OnEvent('transaction.purchase')
  handle(event: EventDTO) {
    try {
      const { amount, walletId, eventId, metadata } = event;

      this.transactionPurchaseUseCase.execute({ eventId, amount, walletId, referenceId: metadata.referenceId });
      return;
    } catch (error) {
      console.log({ error });
    }
  }
}
