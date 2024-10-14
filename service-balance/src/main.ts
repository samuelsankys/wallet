import { NestFactory } from '@nestjs/core';
import { BalanceModule } from './balance.module';
import * as dotenv from 'dotenv';
import { Transport } from '@nestjs/microservices';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(BalanceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'balance_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
  console.log(`Microservice Balance is listening`);
}
bootstrap();
