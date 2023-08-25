import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';

export class SignInResponse {
  @ApiProperty()
  token: string;

  @ApiProperty({
    type: User,
  })
  user: User;
}
