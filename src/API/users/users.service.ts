import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private _prisma: PrismaService
  ) {}

  async findAll() {
    return await this._prisma.user.findMany();
  }

  async findOneByEmail(email: string) {

    if(!email.includes('@') || email[email.length - 1] === '@') throw new HttpException('Invalid email', 400);

    return await this._prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findOneById(id: number) {
    return await this._prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    const hash = await this.hashPassword(dto.password);
    const usernameExists = await this._prisma.user.findFirst({ where: { username: dto.username } });
    if(usernameExists) throw new HttpException('User with this username already exists', 400);
    const emailExists = await this._prisma.user.findFirst({ where: { email: dto.email } });
    if(emailExists) throw new HttpException('User with this email already exists', 400);
    return await this._prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        username: dto.username ?? ''
      }
    })
  }

  async update(dto: UpdateUserDto): Promise<UserDto> {
    if(isNaN(dto.id)) throw new HttpException('Invalid id', 400);
    console.log(dto)
    const hash = dto.password ?  await this.hashPassword(dto.password) : undefined;
    const usernameExists = dto.username ? await this._prisma.user.findFirst({ where: { username: dto.username } }) : undefined;
    if(usernameExists) throw new HttpException('User with this username already exists', 400);
    const emailExists = dto.email ?  await this._prisma.user.findFirst({ where: { email: dto.email } }) : undefined;
    if(emailExists) throw new HttpException('User with this email already exists', 400);
    return await this._prisma.user.update({
      data: {
        username: dto.username,
        email: dto.email,
        password: hash
      },
      where: {
        id: dto.id
      }
    })
  }

  async delete(id: number): Promise<UserDto> {
    if(id < 1 || isNaN(id)) throw new HttpException('Invalid id', 400);

    const user = await this.findOneById(id);
    if(!user) throw new HttpException(`User with id ${id} does not exist`, 404);
    return await this._prisma.user.delete({
      where: {
        id
      }
    })
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

}

