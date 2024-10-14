import { Module } from '@nestjs/common';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
