import { Body, Controller, Post, Get, Query, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PurchaseDto } from './dto/purchase.dto';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
@ApiTags('Purchases')
export class PurchasesController {
  constructor(private _purchasesService: PurchasesService) {}

  @ApiOperation({ summary: 'Recieve all purchases' })
  @Get('find-all')
  async findAll() {
    return this._purchasesService.findAll();
  }

  @ApiOperation({ summary: 'Create new purchase' })
  @Post('create')
  async create(@Body() dto: PurchaseDto) {
    return this._purchasesService.create(dto);
  }

  @ApiOperation({ summary: 'Delete purchase by id' })
  @Delete('delete')
  async delete(@Param('id') id: number) {
    return this._purchasesService.delete(+id);
  }
}