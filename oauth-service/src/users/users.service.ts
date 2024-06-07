import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async updateUser(id: number, updateUser: UpdateUserDto) {
    await this.findById(id);

    await this.userRepository.update(
      {
        id,
      },
      {
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
      },
    );

    const userUpdate = this.findById(id);
    return userUpdate;
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUser() {
    const result = await this.userRepository.find();
    return result;
  }

  async findOne(user_name: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        user_name,
      },
    });
  }

  async createUser(createUser: CreateUserDto) {
    const { firstName, lastName, user_name } = createUser;

    const isUserName = await this.userRepository.exists({
      where: {
        user_name,
      },
    });

    if (isUserName) {
      throw new HttpException('User name already exists', HttpStatus.CONFLICT);
    }

    const user_create = this.userRepository.create({
      user_name,
      lastName,
      firstName,
      password: '0000',
    });

    const user_created = await this.userRepository.save(user_create);

    return user_created;
  }
}
