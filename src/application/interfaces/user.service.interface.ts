import { User } from '../../core/domain/entities/user.entity';

export interface IUserService {
  registerUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User>;
}
