import {
  Body,
  Controller,
  Get,HttpStatus,Param,ParseIntPipe,Post,Put,Res 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseResponse } from 'src/response/baseRespose';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Get("list")
  async getAllUser(@Res() res: Response) {
    const data = await this.usersService.getAllUser();
    return res.status(HttpStatus.OK).json({data, status : 200});
  }

  @Post('create')
  async createUser(@Body() createUser: CreateUserDto) {
    const response = await this.usersService.createUser(createUser)
    return new BaseResponse(response, "Successlly!!!", HttpStatus.CREATED);
  }
  
  @Put('update/:id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUser: UpdateUserDto) {  
    const response = await this.usersService.updateUser(id, updateUser)
    return new BaseResponse(response, "Successlly!!!", HttpStatus.OK);
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    const response = await this.usersService.findById(id)
    return new BaseResponse(response, "Successlly!!!", HttpStatus.OK);
  }

}
