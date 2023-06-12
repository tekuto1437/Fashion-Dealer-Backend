import { IsEmail, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

type ProductsList = {
  list: any[]
}

export class PurchaseDto {

  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  userEmail!: string;

  @ApiProperty({ example: 1000 })
  @Min(1)
  totalCost!: number;

  @ApiProperty({ example: { 
    list: [ 
      { id: 1, title: 'Example 1', description: 'Example description 1', price: 1000, category: 'Mens', size: 'XL', totalCounter: 100, counter: 10 },
      { id: 2, title: 'Example 2', description: 'Example description 2', price: 100, category: 'Women', size: 'M', totalCounter: 5000, counter: 100  },
    ]} 
  })
  products: ProductsList;
}