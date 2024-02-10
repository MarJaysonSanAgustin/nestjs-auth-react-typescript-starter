import { Inject, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_PROVIDER') private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userWithEncryptedPassword = await this.encryptPassword(createUserDto);
    const user = this.userRepository.create(userWithEncryptedPassword);
    const createdUser = await this.userRepository.save(user);
    delete createdUser.password;
    return createdUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    const findOneOptions: FindOneOptions<User> = {
      where: { email },
      select: ['id', 'email', 'firstName', 'lastName', 'password'],
    };
    const user = await this.userRepository.findOne(findOneOptions);
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  public async encryptPassword(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    const rounds = +process.env.HASH_ROUNDS;
    createUserDto.password = await hash(createUserDto.password, rounds);
    return createUserDto;
  }
}
