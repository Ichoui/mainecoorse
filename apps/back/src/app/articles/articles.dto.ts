import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ItemType, Tags } from '@shared-interfaces/items';
import { EFlags } from '@shared-interfaces/flags';

export class ArticlesCreateDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  label: string;

  @IsString()
  @MaxLength(1024)
  description: string;

  @IsNotEmpty()
  @IsEnum(ItemType)
  itemType: ItemType;

  @IsNotEmpty()
  @IsEnum(EFlags)
  flag: EFlags;

  @IsString()
  @MaxLength(512)
  url: string;

  @IsNotEmpty()
  @IsArray()
  tags: string[] | Tags[];
}

export class ArticlesUpdateDto extends ArticlesCreateDto {}
