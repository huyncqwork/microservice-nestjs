import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { BaseResponse } from 'src/response/baseRespose';
import { HttpExceptionFilter } from 'src/util/ExceptionFilter';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signIn(
    user_name: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(user_name);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, user_name: user.user_name };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const { user_name, password, lastName, firstName } = signUpDto;
      const isUserExists = await this.userRepository.exists({
        where: {
          user_name,
        },
      });

      if (isUserExists) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      const user_create = this.userRepository.create({
        user_name,
        password,
        lastName,
        firstName,
      });

      const user_created = await this.userRepository.save(user_create);

      return user_created;
    } catch (error) {
      console.log('🚀 ~ AuthService ~ signUp ~ error:', error);
    }
  }

  async checkUserNameService(user_name: string) {
      const isUserNameExists = await this.userRepository.exists({
        where: {
          user_name,
        },
      });
  
      if (!isUserNameExists) {
        throw new HttpException('User does not exists!', HttpStatus.NOT_FOUND);
      }
      const newCode = this.getFourRandomIntegersAsString();
      await this.userRepository.update({
        user_name
      }, {
        code: newCode
      })

      return {"code": newCode};
  }

  async checkCodeService(code: string, user_name: string) {
    const isCodeExists = await this.userRepository.exists({
      where: {
        code,
        user_name
      }
    });

    if (!isCodeExists) {
      throw new HttpException('Wrong code', HttpStatus.BAD_REQUEST)
    }
    return null;
  }

  async changePassword(user_name: string, code: string, password: string) {
    const isCodeExists = await this.userRepository.exists({
      where: {
        code,
        user_name
      }
    });

    if (!isCodeExists) {
      throw new HttpException('Wrong code', HttpStatus.BAD_REQUEST)
    }

    await this.userRepository.update({
      code,
      user_name
    }, {
      password
    })
    return {
      "user_name": user_name,
      "password": password
    };
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  getFourRandomIntegersAsString(): string {
    let randomIntegersString: string = '';
    for (let i = 0; i < 4; i++) {
      randomIntegersString += this.getRandomInt(0, 9).toString();
    }
    return randomIntegersString;
  }
}
