import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NotesDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(5000)
  notes: string;
}
