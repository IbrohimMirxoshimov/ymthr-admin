import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsPositiveInt } from 'src/utils/validators/is-positive-int.validator';

export class AuthConfirmEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  hash: string;
}

export class AuthConfirmDto {
  @ApiProperty({ description: 'email or phone number' })
  @IsString()
  username: string;

  @ApiProperty()
  @IsPositiveInt()
  code: number;
}
