import { UsersService } from './users/users.service';
import { Body, Controller, Get, Post, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './common/guards/login.guard';
import { Request, Response } from 'express';
import { AuthExceptionFilter } from './common/filters/auth-exception.filter';
import { GetUsers } from './common/decorators/get-users.decorators';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly usersService: UsersService
  ) { }

  @Get('login')
  getIndexLogin(@Req() req: Request, @GetUsers() user: User) {
    return {
      message: req.flash('loginError'),
      username: req.flash('username'),
      class: req.flash('class')
    }
  }
  @Get('password-reset')
  passwordReset(){
    
  }

  @Post('login')
  @UseGuards(LoginGuard)
  @UseFilters(AuthExceptionFilter)
  async doLogin(@Res() res: Response ,@Body() body: { username: string; senha: string }) {
    return res.status(200).json({ message: 'Logout realizado com sucesso' });;
  }

  @Post('logout')
  // @UseGuards(LoginGuard)
  @UseFilters(AuthExceptionFilter)
  async doLogout(@Res() res: Response ,@Req() req: Request, @Body() body: { username: string; senha: string }) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao destruir a sessão' });
      }
    });
    return res.status(200).json({ message: 'Logout realizado com sucesso' });;
  }

}
