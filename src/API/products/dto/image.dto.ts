import { ProductDto } from "./product.dto";

export class ImageDto {
  name: string;
  originalUrl: string;
  productId: number;
  product: ProductDto;
  id: number;
}
