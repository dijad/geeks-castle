// src/application/use-cases/register-user.use-case.ts
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { User } from '../../core/domain/entities/user.entity';
import { IUserRepository } from '../../core/domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '../tokens/tokens';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user.created.event';
import { hashPassword } from 'src/shared/utils/password.utils';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(username: string, email: string, password?: string): Promise<User> {
    await this.validateUserDoesNotExist(email);
    
    let userData: Partial<User> = { username, email };
    
    if (password) {
      userData.password = await this.getHashedPassword(password);
    }
    
    const newUser = new User('', userData.username, userData.email, userData.password);
    const createdUser = await this.userRepository.create(newUser);
    
    this.eventEmitter.emit('user.created', new UserCreatedEvent(createdUser.id));
    
    return createdUser;
  }

  private async validateUserDoesNotExist(email: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
  }

  private async getHashedPassword(password: string): Promise<string> {
    return hashPassword(password);
  }
}