import { UnauthorizedException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super()
    };

    async validador(username:string, senha:string){
        const user = await this.authService.validadorUser(username,senha);
        if(!user){
            throw new UnauthorizedException();
        };
        return user;
    }
}