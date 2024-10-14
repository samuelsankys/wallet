import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TransactionCompletedEvent } from 'src/application/domain/events/transaction-completed-event';

@EventsHandler(TransactionCompletedEvent)
export class TransactionCreatedHandler implements IEventHandler<TransactionCompletedEvent> {
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

  handle(event: TransactionCompletedEvent) {
    console.log(`Transaction completed: ${event.transactionId}`);
    this.client.emit('transaction.completed', {
      transactionId: event.transactionId,
      type: event.transactionType,
      amount: event.amount,
      afterBalance: event.afterBalance,
    });
  }
}
