import { Injectable } from '@nestjs/common';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import RequestWithUser from 'src/interfaces/requestUser.interface';
import { UsersService } from 'src/users/users.service';
import { UserInfo } from 'src/utils/types';
import { JwtPayload } from './strategy/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userinfo: UserInfo): Promise<User> {
    const user = await this.userService.findOneByEmail(userinfo.email);
    if (user) {
      return user;
    }
    return await this.userService.Create(userinfo);
  }
  loginUser(request: RequestWithUser) {
    const payload: JwtPayload = {
      email: request.user.email,
      sub: request.user.id,
    };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
