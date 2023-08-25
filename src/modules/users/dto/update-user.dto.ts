import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsExist } from '../../../utils/validators/is-exists.validator';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';
import { Role } from '../../roles/entities/role.entity';

export enum UserLangEnum {
  uz = 'uz',
  en = 'en',
  ru = 'ru',
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: string;

  social_id?: string;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  first_name?: string;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  last_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  photo_id?: string;

  @ApiProperty({ type: Role })
  @IsOptional()
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role;

  hash?: string;
}
