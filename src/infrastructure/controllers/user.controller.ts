// src/infrastructure/controllers/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';

@Controller('users')
export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  async register(@Body() body: { username: string; email: string; password?: string }) {
    const { username, email, password } = body;
    return this.registerUserUseCase.execute(username, email, password);
  }
}