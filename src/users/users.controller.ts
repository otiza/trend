import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guard/fortytwo.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import RequestWithUser from 'src/interfaces/requestUser.interface';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getall() {
    const all: User[] = await this.userService.getAll();
    return all;
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getme(@Req() req: RequestWithUser) {
    return req.user;
  }
}
