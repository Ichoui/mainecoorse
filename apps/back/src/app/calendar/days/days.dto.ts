import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { EDays, ItemType } from '@shared-interfaces/items';

export class DaysDto {
  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @IsNotEmpty()
  @IsEnum(ItemType)
  type: ItemType;

  @IsNotEmpty()
  @IsEnum(EDays)
  slug: EDays;
}
