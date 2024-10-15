import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BALANCE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'balance_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
