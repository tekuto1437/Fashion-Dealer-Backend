import { HttpException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BucketType } from 'minio/interfaces/bucket-type.enum';
import { ImageDto } from './dto/image.dto';
import { PrismaService } from 'src/Prisma/prisma/prisma.service';
import { MinioRepository } from 'minio/minio.repository';
import { Product } from '@prisma/client';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private _prisma: PrismaService,
    private _minio: MinioRepository
  ) {}


  async findAll(): Promise<Product[]> {
    return await this._prisma.product.findMany({
      include: {
        images: true
      }
    });
  }

  async findPage(page: string, perPage: string): Promise<{ page: Product[], totalProductsCount: number }> {
    if(+page < 0 || isNaN(+page)) throw new HttpException('Invalid page value', 400);
    if(+perPage < 1 || isNaN(+perPage)) throw new HttpException('Invalid perPage value', 400);
    
    const offset = +page * +perPage;

    const productsCount = ( await this.findAll() ).length;

    const currentPage = await this._prisma.product.findMany({
      skip: offset,
      take: +perPage,
      include: {
        images: true
      }
    })

    return { page: currentPage, totalProductsCount: productsCount }
  }

  async createProduct(dto: ProductDto): Promise<Product> {
    const productTitleExists = await this._prisma.product.findFirst({ where: { title: dto.title  } });
    if(productTitleExists) throw new HttpException('Product with this title already exists', 400);
    return await this._prisma.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        totalCounter: dto.totalCounter,
        size: dto.size,
        category: dto.category
      }
    })
  }

  async updateProduct(dto: UpdateProductDto): Promise<Product> {
    if(isNaN(dto.id)) throw new HttpException('Invalid id or not provided', 400);
    const productTitleExists = await this._prisma.product.findFirst({ where: { title: dto.title  } });
    if(productTitleExists) throw new HttpException('Product with this title already exists', 400);
    return await this._prisma.product.update({ 
      data: {
        ...dto
      },
      where: {
        id: +dto.id
      }
    })
  }

  async deleteProduct(id: number): Promise<Product> {
    if(id < 1 || isNaN(id)) throw new HttpException('Invalid id', 400);

    const product = await this._prisma.product.findUnique({ where: { id } });
    if(!product) throw new HttpException(`Product with id ${id} does not exist`, 404);
    return await this._prisma.product.delete({
      where: {
        id
      }
    })
  }

  async addImage(id: number, file: Express.Multer.File): Promise<any> {
    const { url } = await this._minio.upload(
        file.originalname,
        file.mimetype,
        file.buffer,
        BucketType.IMAGES,
      );
      const createdImage = this._prisma.productImage.create({
        data: {
          name: file.originalname,
          originalUrl: url,
          productId: +id
        },
      });
      return plainToInstance(ImageDto, createdImage);
  }
}
