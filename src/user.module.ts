// src/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { USER_REPOSITORY, USER_SERVICE } from './application/tokens/tokens';
import { UserCreatedListener } from './application/listeners/user.created.listener';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    RegisterUserUseCase,
    UserCreatedListener,
  ],
})
export class UserModule {}