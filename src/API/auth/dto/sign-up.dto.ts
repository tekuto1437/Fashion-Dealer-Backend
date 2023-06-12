import { IsEmail, MinLength, MaxLength, IsStrongPassword, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {

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

  @ApiProperty({ example: 'Username' })
  @IsNotEmpty()
  username!: string;

}