import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUserId(username);
    if (user.userPassword !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.userId, sub: user.id };
    return {
      // signAsync: 토큰 생성, payload 암호화
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async profile(userId: string): Promise<User> {
    return this.usersService.getUserByUserId(userId);
  }
}
