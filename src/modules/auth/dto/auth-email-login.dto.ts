import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
export interface AuthResponse {
  user: User;
  token: string;
  expires: number;
}
