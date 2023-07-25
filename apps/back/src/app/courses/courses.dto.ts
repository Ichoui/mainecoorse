import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CoursesDto {

}

export class CoursesQuantityDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: boolean;
}
export class CoursesPurchasedDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsBoolean()
  purchased: boolean;
}
