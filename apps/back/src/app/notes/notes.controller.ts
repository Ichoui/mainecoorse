import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';

import { NotesService } from './notes.service';
import { ReqInterceptor } from '../../shared/interceptor.service';
import { NotesDto } from './notes.dto';

@UseInterceptors(ReqInterceptor)
@Controller('notes')
export class NotesController {
  constructor(private readonly _notesService: NotesService) {}

  @Get()
  getNotes(): Promise<string> {
    return this._notesService.getNotes();
  }

  @Post()
  postNotes(@Body() notes: NotesDto): Promise<string> {
    return this._notesService.postNotes(notes);
  }
}
