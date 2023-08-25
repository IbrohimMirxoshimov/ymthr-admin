import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/utils/types/express.type';
import { User } from '../users/entities/user.entity';

export function generateJWT(user: User, jwtService: JwtService) {
  const payload: JwtPayload = {
    id: user.id,
    role: user.role,
  };

  return jwtService.sign(payload);
}
