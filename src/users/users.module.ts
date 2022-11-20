import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
