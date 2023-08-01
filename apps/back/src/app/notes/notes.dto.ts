import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NotesDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(2048)
  notes: string;
}
