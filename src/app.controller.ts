import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './common/guards/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndexLogin(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @UseGuards(LoginGuard)
  async doLogin(@Body() body: { username: string; senha: string }) {
    return { message: 'Login bem-sucedido' }; // Retorne uma resposta apropriada aqui
  }

}
