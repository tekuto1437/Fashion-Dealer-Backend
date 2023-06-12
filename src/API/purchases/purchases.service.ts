import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma/prisma.service';
import { PurchaseDto } from './dto/purchase.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PurchasesService {
  constructor(
    private _prisma: PrismaService,
    private _userService: UsersService
  ) {}

  async findAll() {
    return await this._prisma.purchases.findMany();
  }

  async create(dto: PurchaseDto) {
    const user = await this._userService.findOneByEmail(dto.userEmail);
    if(!user) throw new HttpException('User does not exist', 404);
    
    return await this._prisma.purchases.create({
      data: {
        userId: user.id,
        totalCost: dto.totalCost,
        products: dto.products
      }
    })
  }

  async delete(id: number) {
    if(id < 1 || isNaN(id)) throw new HttpException('Invalid id', 400);

    const purchase = await this._prisma.purchases.findUnique({ where: { id } });
    if(!purchase) throw new HttpException(`Purchase with id ${id} does not exist`, 404);

    return await this._prisma.purchases.delete({
      where: {
        id
      } 
    })
  }
}
