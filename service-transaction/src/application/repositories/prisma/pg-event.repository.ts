import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-connection';
import { EventDAO, IEventRepository } from '../event.repository';
import { EventMapper } from 'src/application/mapper/event.map';

@Injectable()
export class PgEventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(event: EventDAO): Promise<void> {
    const data = EventMapper.toPersistence(event);
    await this.prisma.events.create({
      data,
    });
  }

  async exists(eventId: string): Promise<boolean> {
    const result = await this.prisma.events.findUnique({
      where: {
        id: eventId,
      },
    });
    return result !== null;
  }
}
