import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public fullname: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public dob: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
