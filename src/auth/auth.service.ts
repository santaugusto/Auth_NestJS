import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt  from'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validadorUser(username: string, senha: string) {
        const user = await this.usersService.findUserByEmail(username);
        if (user) {
            console.log('Senha fornecida:', senha);
            console.log('Hash no banco:', user.senha);
            const match = await bcrypt.compare(senha, user.senha); // Certifique-se de que "user.senha" é o campo correto
            return match ? user : null;  // Se as senhas não coincidem, retorna null
        }
        return null;
    }
}
