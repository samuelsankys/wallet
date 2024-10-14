import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BalanceService } from './balance.service';
import { IBalanceService } from './service-balance.interface';

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
  providers: [BalanceService, { provide: IBalanceService, useClass: BalanceService }],
  exports: [IBalanceService, BalanceService],
})
export class BalanceModule {}
