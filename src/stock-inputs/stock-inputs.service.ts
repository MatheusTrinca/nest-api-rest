import { Injectable } from '@nestjs/common';
import { CreateStockInputDto } from './dto/create-stock-input.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'src/errors';

@Injectable()
export class StockInputsService {
  constructor(private prismaService: PrismaService) {}

  async create(createStockInputDto: CreateStockInputDto) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: createStockInputDto.productId,
      },
    });

    if (!product) {
      throw new NotFoundError(
        `Product with id ${createStockInputDto.productId} was not found`,
      );
    }

    const result = await this.prismaService.$transaction([
      this.prismaService.stockInput.create({
        data: {
          ...createStockInputDto,
          productId: product.id,
        },
      }),
      this.prismaService.product.update({
        where: {
          id: product.id,
        },
        data: {
          quantity: {
            increment: createStockInputDto.quantity,
          },
        },
      }),
    ]);
    return result[0];
  }

  findAll() {
    return this.prismaService.stockInput.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.stockInput.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundError(`StockInput with id ${id} was not found`);
    }
  }
}
