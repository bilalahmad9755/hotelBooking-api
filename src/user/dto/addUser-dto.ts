import { IsNotEmpty, IsStrongPassword } from 'class-validator';
export class AddUserDto {
  @IsNotEmpty()
  username: string | string[];

  @IsNotEmpty()
  @IsStrongPassword()
  password: string | string[];
}
