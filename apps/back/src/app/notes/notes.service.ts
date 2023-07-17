import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {
  getNotes(): string {
    const notes = 'Ceci sont des notes depuis l API';

    return notes;
  }
}
