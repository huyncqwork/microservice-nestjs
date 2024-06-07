import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Param,
  Query,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.public';
import { SignUpDto } from './dto/sign-up.dto';
import { BaseResponse } from 'src/response/baseRespose';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data: {id: number, name: string}, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @UseFilters()
  @Get('check-user-name')
  async check_user_name(@Query('user_name') user_name:string) {
      const response = await this.authService.checkUserNameService(user_name);
      return new BaseResponse(response, 'User exists', HttpStatus.OK);
  }
  
  @Public()
  @UseFilters()
  @Post('check-code')
  async check_code(@Body() code: {code: string, user_name: string}) {
      const response = await this.authService.checkCodeService(code.code, code.user_name);
      return new BaseResponse(response, 'Successfully!!!', HttpStatus.OK);
  }
  
  @Public()
  @UseFilters()
  @Post('change-password')
  async change_password(@Body() changePassword: {user_name: string, code: string, password: string}) {
      const response = await this.authService.changePassword(changePassword.user_name, changePassword.code, changePassword.password);
      return new BaseResponse(response, 'Successfully!!!', HttpStatus.OK);
  }
}
