import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NotesDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  notes: string;
}
