import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotesEntity } from './notes.entity';
import { Repository } from 'typeorm';
import { NotesDto } from './notes.dto';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(NotesEntity) private _notesEntityRepository: Repository<NotesEntity>) {}

  async getNotes(): Promise<NotesDto> {
    return this._notesEntityRepository.findOne({ where: { oneId: 1 } });
  }

  async postNotes(notesDto: NotesDto): Promise<NotesDto> {
    console.log(notesDto.notes);
    const entity = this._notesEntityRepository.create({ oneId: 1, ...notesDto });
    return this._notesEntityRepository.save(entity);
  }
}
