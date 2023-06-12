import { IsEmail, MinLength, MaxLength, IsStrongPassword, IsNotEmpty, Min, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

  @ApiProperty({ example: 'example@gmail.com' })
  @MinLength(5)
  @MaxLength(40)
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssword123' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'Username' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 1 })
  @Min(1)
  id!: number;

  @IsDate()
  createdAt!: Date;
}