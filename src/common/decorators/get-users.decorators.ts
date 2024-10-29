import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";

export const GetUsers = createParamDecorator(
    (_data, contexto: ExecutionContext): User => {
        const req = contexto.switchToHttp().getRequest();
        return req.user;
    }
)