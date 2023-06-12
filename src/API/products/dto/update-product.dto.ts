import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';

export class UpdateProductDto {

  @ApiProperty({ example: 'Cool product title' })
  title?: string;

  @ApiProperty({ example: 'Description of cool product' })
  description?: string;

  @ApiProperty({ example: '100' })
  @Min(1)
  price?: number;

  @ApiProperty({ example: 'Mens' })
  category?: string;

  @ApiProperty({ example: 'XL' })
  size?: string;

  @ApiProperty({ example: '20' })
  @Min(1)
  totalCounter?: number;

  id!: number;

}