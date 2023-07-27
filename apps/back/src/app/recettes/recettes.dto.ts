import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ItemType, Tags } from '@shared-interfaces/items';

export class RecettesCreateDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  label: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  description: string;

  @IsNotEmpty()
  @IsEnum(ItemType)
  itemType: ItemType;

  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  url: string;

  @IsNotEmpty()
  @IsArray()
  tags: string[] | Tags[];

  @IsNotEmpty()
  @IsArray()
  articlesList: ArticlesListDto[];
}

export class RecettesUpdateDto extends RecettesCreateDto {}

export class ArticlesListDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
