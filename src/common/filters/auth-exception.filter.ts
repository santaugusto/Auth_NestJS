import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request,Response } from "express";

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const contexto = host.switchToHttp();
        const response = contexto.getResponse<Response>();
        const request = contexto.getRequest<Request>();
        
        if(exception instanceof UnauthorizedException || exception instanceof ForbiddenException){
            request.flash('loginError', "usuario/senha inválidos");
            request.flash('username', request.body.username);
            request.flash('class','is-invalid');
            response.redirect('/login')
        }else if(exception instanceof NotFoundException){
            response.redirect('/404')
        }
    }
}