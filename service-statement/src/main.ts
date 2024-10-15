import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { Transport } from '@nestjs/microservices';
import { StatementModule } from './statement.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(StatementModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'statement_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
  console.log(`Microservice Statement is listening`);
}
bootstrap();
