import { Module } from '@nestjs/common';
import { EventModule } from './modules/event/event.module';
import { StatementModule } from './modules/statement/statement.module';
import { BalanceModule } from './modules/balance/balance.module';

@Module({
  imports: [EventModule, StatementModule, BalanceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
