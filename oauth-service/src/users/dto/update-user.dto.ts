import { IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'không được để trống' })
  @Length(2, 20, { message: 'First name lớn hơn 2 và nhỏ hơn 20' })
  firstName: string;

  @IsNotEmpty({ message: 'không được để trống' })
  @Length(2, 20, { message: 'Last name lớn hơn 2 và nhỏ hơn 20' })
  lastName: string;
}
