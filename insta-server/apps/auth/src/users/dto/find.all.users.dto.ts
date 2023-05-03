import { IsOptional, IsString } from 'class-validator';

export class FindAllUsersDTO {
  @IsOptional()
  @IsString()
  name?: string;
}
