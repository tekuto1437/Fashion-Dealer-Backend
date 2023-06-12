import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessToken } from './types/access-token';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor( private _authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user, and recieve access token' })
  @Post('signup')
  signUp(@Body() dto: SignUpDto): Promise<AccessToken> {
    return this._authService.signUp(dto);
  }

  @ApiOperation({ summary: 'Recieve acess token, with existing`s user credentials' })
  @Post('signin')
  signIn(@Body() dto: SignInDto): Promise<AccessToken> {
    return this._authService.signIn(dto);
  }
}
