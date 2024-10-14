import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  transaction(serviceA: string): string {
    return `Service A says: ${serviceA}`;
  }
}
