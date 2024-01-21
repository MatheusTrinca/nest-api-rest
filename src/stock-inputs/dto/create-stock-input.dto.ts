import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateStockInputDto {
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: string;
}
