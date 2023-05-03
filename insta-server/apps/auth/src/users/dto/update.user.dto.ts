import {
  Equals,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Types } from 'mongoose';
import { Exclude } from 'class-transformer';

export class UpdateUserDTO {
  @ValidateIf((dto) => dto.name !== undefined)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ValidateIf((dto) => dto.email !== undefined)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @Equals(undefined, {
    message:
      'password cannot be updated here, please use the proper endpoint for this operation',
  })
  password?: string;

  @Exclude()
  _id?: Types.ObjectId;
}
