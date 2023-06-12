import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service'; 
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private _usersService: UsersService) {}

  @ApiOperation({ summary: 'Recieve all users' })
  @Get('find-all')
  async findAll(): Promise<UserDto[]> {
    return this._usersService.findAll();
  }

  @ApiOperation({ summary: 'Recieve user by provided email' })
  @Get(':email')
  async findOneByEmail(@Param('email') email: string): Promise<UserDto> {
    return this._usersService.findOneByEmail(email);
  }

  @ApiOperation({ summary: 'Create new user with hashed password' })
  @Post('create')
  async create(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this._usersService.create(dto);
  }

  @ApiOperation({ summary: 'Update existing user' })
  @Patch('update')
  async update(@Body() dto: UpdateUserDto): Promise<UserDto> {
    return this._usersService.update(dto);
  }

  @ApiOperation({ summary: 'Delete existing user by id' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<UserDto> {
    return this._usersService.delete(+id);
  }
}
