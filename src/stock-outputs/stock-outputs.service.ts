import { Injectable } from '@nestjs/common';
import { CreateStockOutputDto } from './dto/create-stock-output.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'src/errors';

@Injectable()
export class StockOutputsService {
  constructor(private prismaService: PrismaService) {}

  async create(createStockOutputDto: CreateStockOutputDto) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: createStockOutputDto.productId,
      },
    });

    if (!product) {
      throw new NotFoundError(
        'Product with id ${createStockOutputDto.productId} was not found',
      );
    }

    if (product.quantity <= 0) {
      throw new Error(
        'Product with id ${createStockOutputDto.productId} is out of stock',
      );
    }

    if (product.quantity < createStockOutputDto.quantity) {
      throw new Error('Invalid quantity');
    }

    const result = await this.prismaService.$transaction([
      this.prismaService.stockOutput.create({
        data: {
          ...createStockOutputDto,
          productId: product.id,
        },
      }),
      this.prismaService.product.update({
        where: {
          id: product.id,
        },
        data: {
          quantity: {
            decrement: createStockOutputDto.quantity,
          },
        },
      }),
    ]);

    return result[0];
  }

  findAll() {
    return this.prismaService.stockOutput.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.stockOutput.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundError(`StockOutput with id ${id} was not found`);
    }
  }
}
