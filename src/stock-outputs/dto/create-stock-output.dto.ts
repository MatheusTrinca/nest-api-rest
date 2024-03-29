import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateStockOutputDto {
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
