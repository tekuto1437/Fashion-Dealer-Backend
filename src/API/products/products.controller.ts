import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from "./products.service";
import { Product } from "@prisma/client";
import { ImageDto } from "./dto/image.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MAX_FILE_SIZE } from '../../constants/add-image.constants';
import { ImageFileFilter } from "./image-filter/filter.image";
import { UploadFileDto } from './dto/upload-file.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(
    private _productService: ProductService
  ) {}

  @ApiOperation({ summary: 'Get all products' })
  @Get('find-all')
  async findAll() {
    return this._productService.findAll()
  }

  @ApiOperation({ summary: 'Returns products in form of page' })
  @Get('find-page')
  async findPage(@Query('page') page: string, @Query('perPage') perPage: string) {
    return this._productService.findPage(page, perPage);
  }

  @ApiOperation({ summary: 'Creates a new product' })
  @ApiBody({ type: ProductDto })
  @Post('create')
  async createProduct(@Body() dto: ProductDto) {
    return this._productService.createProduct(dto);
  }
  
  @ApiOperation({ summary: 'Updates an existing product' })
  @ApiBody({ type: UpdateProductDto })
  @Patch('update')
  async updateProduct(@Body() dto: UpdateProductDto) {
    return this._productService.updateProduct(dto);
  }

  @ApiOperation({ summary: 'Deletes product by id' })
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return await this._productService.deleteProduct(+id);
  }


  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Assign image to product' })
  @ApiResponse({
    status: HttpStatus.PAYLOAD_TOO_LARGE,
    description: 'File too large'
  })
  @UseInterceptors(
    FileInterceptor('file', {
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: ImageFileFilter
  }))
  @Post(':id/images')
  async addImage(
    @Body() _: UploadFileDto,
    @Param('id') id: number,
    @UploadedFile() image: Express.Multer.File
  ): Promise<ImageDto> {
    return await this._productService.addImage(id, image);
  }
}
