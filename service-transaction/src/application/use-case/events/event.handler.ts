import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventDTO } from './event.DTO';
import { TransactionTypeEnum } from 'src/application/domain/transaction';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEventRepository } from 'src/application/repositories/event.repository';

@Injectable()
export class EventHandler {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly eventRepo: IEventRepository,
  ) {}

  @MessagePattern('event')
  async handle(input: EventDTO) {
    const alreadyExists = await this.eventRepo.exists(input.eventId);
    if (alreadyExists) return true;

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

    await this.eventRepo.save(input);
    return true;
  }
}
