import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthExceptionFilter } from 'src/common/filters/auth-exception.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { TipoUsuario } from './enum/tipo-users.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseFilters(AuthExceptionFilter)
  @UseGuards(RolesGuard)
  @Roles(TipoUsuario.ADMIN,TipoUsuario.FUNCIONARIO)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  };

  @Get()
  @UseFilters(AuthExceptionFilter)
  @UseGuards(RolesGuard)
  @Roles(TipoUsuario.ADMIN,TipoUsuario.FUNCIONARIO)
  findAll() {
    return this.usersService.findAll();
  };

  @Get(':id')
  
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  };

  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string) {
    if (!email || typeof email !== 'string') {
      throw new BadRequestException('Invalid email format');
    }
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  


  @Patch(':id')
  
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
