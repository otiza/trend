import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserInfo } from 'src/utils/types';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  //creating the users
  async Create(userData: UserInfo): Promise<User> {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }
  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  // getName(id: number): Promise<String> {
  //   return this.findOne(id).then((user) => user.displayName);
  // }

  async getUsername(id: number): Promise<string> {
    return this.findOne(id).then((user) => {
      if (user == null) return '';
      return user.username;
    });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email: email });
  }
}
