import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';

export class ProductDto {

  @ApiProperty({ example: 'Cool product title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Description of cool product' })
  description?: string;

  @ApiProperty({ example: '100' })
  @Min(1)
  price: number;

  @ApiProperty({ example: 'Mens' })
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'XL' })
  @IsNotEmpty()
  size: string;

  @ApiProperty({ example: '20' })
  @Min(1)
  totalCounter: number;

}