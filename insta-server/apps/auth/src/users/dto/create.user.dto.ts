import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsValidPassword } from '../../utils/decorators/is.valid.password.decorator';
import { Exclude } from 'class-transformer';

export class CreateUserDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @IsValidPassword()
  password: string;

  @Exclude()
  tokenVersion: number;
}
