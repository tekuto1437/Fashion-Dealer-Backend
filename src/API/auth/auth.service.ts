import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './types/access-token';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private _jwtService: JwtService,
    private _userService: UsersService
  ) {}

  /* ENDPOINT'S LOGIC */

  async signUp(dto: SignUpDto): Promise<AccessToken> {
    const isUserExist = await this._userService.findOneByEmail(dto.email);
    if (isUserExist) {
      throw new HttpException('User already exist', 403);
    }

    const newUser = await this._userService.create(
      {
        email: dto.email, 
        password: dto.password, 
        username: dto.username
      }
    );

    return await this.createAccessToken(newUser.id, dto.email);
  }

  async signIn(dto: SignInDto): Promise<AccessToken> {
    const user = await this._userService.findOneByEmail(dto.email);
    if (!user) throw new HttpException('User does not Exist', 404);

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) throw new HttpException('Wrong password', 403);

    return await this.createAccessToken(user.id, user.email);
  }

  /* UTILS */

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createAccessToken(userId: number, email: string) {
    const accessToken = await this._jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: 'at-secret',
        expiresIn: '3600s',
      },
    );

    return {
      accessToken: accessToken,
    };
  }
}
