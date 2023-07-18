import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { NotesService } from './notes.service';
import { ReqInterceptor } from '../../shared/interceptor.service';

@UseInterceptors(ReqInterceptor)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getNotes(): string {
    return this.notesService.getNotes();
  }
}
