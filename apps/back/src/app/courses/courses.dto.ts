import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CoursesDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
export class CoursesQuantityDto extends CoursesDto {}

export class CoursesPurchasedDto {
  @IsNotEmpty()
  @IsBoolean()
  purchased: boolean;
}
