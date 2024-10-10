import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt  from'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}
    
    async validadorUser(username:string, senha) {
        const user = await this.usersService.findUserByEmail(username);
        if(user) {
            const match = await bcrypt.compare(senha, user.senha);
            return match === true ? user : null;
        }
        return null;
    };
};
