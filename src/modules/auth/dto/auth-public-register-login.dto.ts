import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { IsValidPhoneNumber } from 'src/utils/validators/is-phone-number.validator';

export class AuthPublicRegisterLoginDto {
  // @ApiPropertyOptional({ example: 'test1@example.com' })
  // @Transform(({ value }) => value.toLowerCase().trim())
  // @ValidateIf((o) => !o.phone_number)
  // @IsEmail()
  // email?: string;

  // @ApiPropertyOptional({ example: '+998111234567' })
  // @ValidateIf((o) => !o.email)
  // @IsValidPhoneNumber()
  // phone_number?: string;
  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsValidPhoneNumber()
  username: string;
}
export class AuthPublicRegisterExtraDto {
  @ApiProperty()
  @MinLength(5)
  password: string;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  is_corporate_customer: boolean;
}

export class AuthResendCode {
  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsString()
  username: string;
}
