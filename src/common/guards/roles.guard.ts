import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TipoUsuario } from "src/users/enum/tipo-users.enum";
import { ROLES_KEY } from "../decorators/roles.decorators";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor( private reflector: Reflector){}
    canActivate(context: ExecutionContext){
        const requiredRoles = this.reflector.getAllAndOverride<TipoUsuario[]>(ROLES_KEY,
            [context.getHandler(),context.getClass()],);
            if(!requiredRoles){
                return true;
            }
            const { user } = context.switchToHttp().getRequest()
            if(!user){
                return false;
            }
            return requiredRoles.some((role)=>user.tipo === role);
        }
}