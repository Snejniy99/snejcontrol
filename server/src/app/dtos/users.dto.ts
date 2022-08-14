import { IsString } from 'class-validator';

export class CreateUserDto {
  public username: string;
  public password: string;
  public repassword: string;
}
