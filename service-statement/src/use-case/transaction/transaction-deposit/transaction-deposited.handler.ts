import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TransactionDepositedEvent } from 'src/application/domain/events/transaction-deposited-event';

@EventsHandler(TransactionDepositedEvent)
export class TransactionCreatedHandler implements IEventHandler<TransactionDepositedEvent> {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'transaction_queue',
      },
    });
  }

  handle(event: TransactionDepositedEvent) {
    console.log(`Transaction created: ${event.transactionId}`);
    this.client.emit('transaction.created', {
      transactionId: event.transactionId,
      type: event.transactionType,
      amount: event.amount,
    });
  }
}
