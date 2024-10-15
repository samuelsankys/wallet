import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { StatementService } from './statement.service';
import { TransactionCompletedEvent } from './transaction-completed-event';

@Controller()
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @MessagePattern('transaction.completed')
  async handleSaveStatement(event: TransactionCompletedEvent) {
    console.log('============================== handleSaveStatement');

    await this.statementService.saveStatement(event);
  }
}
