import { Injectable } from '@nestjs/common';
import { CreatePasswordResetDto } from './dto/create-password-reset.dto';
import { UpdatePasswordResetDto } from './dto/update-password-reset.dto';
import { UsersService } from 'src/users/users.service';
import { PasswordReset } from './entities/password-reset.entity';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PasswordResetService {

  constructor(private readonly userSerive: UsersService,
    @InjectRepository(PasswordReset)
    private passwordResetRepository: Repository<PasswordReset>
  ) { }
  async createPasswordReset(createPasswordResetDto: CreatePasswordResetDto) {
    const user = await this.userSerive.findUserByEmail(createPasswordResetDto.email)
    if (user) {
      const passwordRest = new PasswordReset()
      passwordRest.email = createPasswordResetDto.email;
      passwordRest.token = randomUUID();
      await this.passwordResetRepository.save(passwordRest);
      await this.email.enviarEmailResetSenha(passwordRest);
    }
  }

  findAll() {
    return `This action returns all passwordReset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordReset`;
  }

  update(id: number, updatePasswordResetDto: UpdatePasswordResetDto) {
    return `This action updates a #${id} passwordReset`;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordReset`;
  }
}
