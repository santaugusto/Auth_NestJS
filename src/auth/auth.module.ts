import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';  
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule,PassportModule, TypeOrmModule.forFeature([User])], 
  providers: [AuthService,LocalStrategy,SessionSerializer,UsersService],
  exports: [AuthService],
})
export class AuthModule {}
