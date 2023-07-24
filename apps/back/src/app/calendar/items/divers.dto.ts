import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ItemType } from '@shared-interfaces/items';

export class DiversDto {
  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @IsNotEmpty()
  @IsEnum(ItemType)
  type: ItemType;
}
