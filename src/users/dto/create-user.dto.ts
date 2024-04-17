import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly userPassword: string;

  @IsString()
  readonly userName: string;
}
