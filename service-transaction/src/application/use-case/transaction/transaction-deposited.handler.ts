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
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: 'statement_queue',
      },
    });
  }

  handle(event: TransactionCompletedEvent) {
    this.client.emit('transaction.completed', {
      transactionId: event.transactionId,
      walletId: event.walletId,
      transactionType: event.transactionType,
      transactionAt: event.transactionAt,
      amount: event.amount,
      status: event.status,
      afterBalance: event.afterBalance,
    });
  }
}
