import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/auth.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private salt = 10;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: RegisterDto) {
    const ifUserExist = await this.userRepository.findOne({
      where: {
        email: data.email.trim(),
      },
    });

    if (ifUserExist) {
      throw new HttpException(
        'User with this name already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userRepository.save({
      email: data.email.trim(),
      username: data.username.trim(),
      password: await this.getHash(data.password),
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email.trim() },
    });
  }

  async getUserById(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.salt);
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
