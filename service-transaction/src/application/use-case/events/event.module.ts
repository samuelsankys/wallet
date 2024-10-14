import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventHandler } from './event.handler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { IEventRepository } from 'src/application/repositories/event.repository';
import { PgEventRepository } from 'src/application/repositories/prisma/pg-event.repository';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [EventController],
  providers: [PrismaService, EventHandler, { provide: IEventRepository, useClass: PgEventRepository }],
})
export class EventModule {}
