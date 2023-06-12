import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength, IsStrongPassword } from 'class-validator';

export class SignInDto {

  @ApiProperty({ example: 'example@gmail.com' })
  @MinLength(5)
  @MaxLength(40)
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'P@ssword123' })
  @MinLength(5)
  @MaxLength(40)
  @IsStrongPassword()
  password!: string;
}