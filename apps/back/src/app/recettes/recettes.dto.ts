import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ItemType, Tags } from '@shared-interfaces/items';
import { EFlags } from '@shared-interfaces/flags';

export class RecettesCreateDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  label: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  link: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  complements: string;

  @IsNotEmpty()
  @IsEnum(ItemType)
  itemType: ItemType;

  @IsNotEmpty()
  @IsEnum(EFlags)
  flag: EFlags;

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
