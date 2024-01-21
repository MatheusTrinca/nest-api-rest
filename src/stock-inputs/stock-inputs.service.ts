import { Injectable } from '@nestjs/common';
import { CreateStockInputDto } from './dto/create-stock-input.dto';

@Injectable()
export class StockInputsService {
  create(createStockInputDto: CreateStockInputDto) {
    return 'This action adds a new stockInput';
  }

  findAll() {
    return `This action returns all stockInputs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockInput`;
  }
}
