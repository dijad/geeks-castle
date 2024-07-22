// src/infrastructure/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from '../../core/domain/entities/user.entity';
import { IUserRepository } from '../../core/domain/repositories/user.repository.interface';
import { db } from '../database/firebase';

@Injectable()
export class UserRepository implements IUserRepository {
  private usersCollection = db.collection('users');

  async create(user: User): Promise<User> {
    const userData: any = {
      username: user.username,
      email: user.email,
    };

    if (user.password) {
      userData.password = user.password;
    }

    const docRef = await this.usersCollection.add(userData);
    return { ...user, id: docRef.id };
  }

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.usersCollection.where('email', '==', email).get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.usersCollection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as User;
  }

  async update(user: User): Promise<void> {
    await this.usersCollection.doc(user.id).update({
      password: user.password,
    });
  }
}