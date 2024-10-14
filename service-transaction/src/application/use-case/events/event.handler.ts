import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventDTO } from './event.DTO';
import { TransactionTypeEnum } from 'src/application/domain/transaction';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventHandler {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @MessagePattern('event')
  handle(input: EventDTO) {
    switch (input.type) {
      case TransactionTypeEnum.Deposit:
        this.eventEmitter.emit('transaction.deposited', input);
        break;

      case TransactionTypeEnum.Withdrawal:
        this.eventEmitter.emit('transaction.withdrawal', input);
        break;

      case TransactionTypeEnum.Purchase:
        this.eventEmitter.emit('transaction.purchase', input);
        break;

      case TransactionTypeEnum.Refund:
        this.eventEmitter.emit('transaction.refund', input);
        break;

      case TransactionTypeEnum.Reversal:
        this.eventEmitter.emit('transaction.reversal', input);
        break;

      default:
        throw new Error("Transaction type doesn't exist");
    }
    return {
      ok: true,
    };
  }
}
