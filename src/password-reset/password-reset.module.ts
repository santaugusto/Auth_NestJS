import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [PasswordResetController],
  providers: [PasswordResetService,UsersService],
})
export class PasswordResetModule {}
