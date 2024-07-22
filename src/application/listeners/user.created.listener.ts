// src/application/listeners/user-created.listener.ts
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user.created.event';
import { IUserRepository } from '../../core/domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '../tokens/tokens';
import { Inject } from '@nestjs/common';
import { generateSecurePassword, hashPassword } from '../../shared/utils/password.utils';

@Injectable()
export class UserCreatedListener {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  @OnEvent('user.created')
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    const user = await this.userRepository.findById(event.userId);
    if (user && !user.password) {
      const newPassword = generateSecurePassword();
      const hashedPassword = await hashPassword(newPassword);
      user.password = hashedPassword;
      await this.userRepository.update(user);
    }
  }
}