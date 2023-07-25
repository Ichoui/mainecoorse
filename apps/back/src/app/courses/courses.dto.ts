import { IsArray, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CoursesDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
export class CoursesPostDto {
  @IsNotEmpty()
  @IsArray()
  articles: CoursesDto[]
}

export class CoursesQuantityDto extends CoursesDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CoursesPurchasedDto {
  @IsNotEmpty()
  @IsBoolean()
  purchased: boolean;
}
