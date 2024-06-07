import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  firstName: string;
  lastName: string;
  @IsString()
  user_name: string;
  @MinLength(4)
  @MaxLength(8)
  password: string;
}
