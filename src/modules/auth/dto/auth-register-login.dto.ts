import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: '+998111234567' })
  phone_number: string;
}
