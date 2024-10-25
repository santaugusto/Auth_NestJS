import { UnauthorizedException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            usernameField: 'email',
            passwordField: 'senha',
          });
    }

    async validate(username: string, senha: string){
        const user = await this.authService.validadorUser(username, senha);
        if (!user) {
            throw new UnauthorizedException(); // Retorna 401 se o usuário não for válido
        }
        return user;
    }
}
