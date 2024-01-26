import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotesEntity } from './notes.entity';
import { Repository } from 'typeorm';
import { NotesDto } from './notes.dto';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(NotesEntity) private _notesEntityRepository: Repository<NotesEntity>) {}

  async getNotes(): Promise<string> {
    const entity: NotesEntity = await this._notesEntityRepository.findOne({ where: { oneId: 1 } });
    if (!entity) {
      const createEntity = this._notesEntityRepository.create({ oneId: 1, notes: '' });
      return this._notesEntityRepository.save(createEntity).then(() => '');
    } else {
      return manageNoteData(entity);
    }
  }

  async postNotes(notesDto: NotesDto): Promise<string> {
    const entity: NotesEntity = this._notesEntityRepository.create({ oneId: 1, ...notesDto });
    return this._notesEntityRepository.save(entity).then(e => manageNoteData(e));
  }
}

function manageNoteData(e: NotesEntity): string {
  return e.notes.length > 0 ? e.notes : undefined;
}
