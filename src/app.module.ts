import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './user.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UserModule,
  ],
})
export class AppModule {}