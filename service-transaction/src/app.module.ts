import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './application/use-case/events/event.module';
import { TransactionModule } from './application/use-case/transaction/transaction.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, EventModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
