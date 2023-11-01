import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  username: string | string[];

  @IsNotEmpty()
  password: string | string[];
}
