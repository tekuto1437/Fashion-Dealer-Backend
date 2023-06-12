import { IsEmail, MinLength, MaxLength, IsStrongPassword, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

  @ApiProperty({ example: 'example@gmail.com' })
  email?: string;

  @ApiProperty({ example: 'P@ssword123' })
  password?: string;

  @ApiProperty({ example: 'Username' })
  username?: string;

  @ApiProperty({ example: 1 })
  @Min(1)
  id!: number;
}