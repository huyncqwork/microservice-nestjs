import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'không được để trống' })
  @Length(2, 20, { message: 'First name lớn hơn 2 và nhỏ hơn 20' })
  firstName: string;

  @IsNotEmpty({ message: 'không được để trống' })
  @Length(2, 20, { message: 'Last name lớn hơn 2 và nhỏ hơn 20' })
  lastName: string;

  @IsNotEmpty({ message: 'không được để trống' })
  @Length(2, 20, { message: 'User name lớn hơn 2 và nhỏ hơn 20' })
  user_name: string;
}
