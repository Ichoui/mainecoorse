import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ItemBase, ItemType } from '@shared-interfaces/items';
import { RecettesCreateDto, RecettesUpdateDto } from './recettes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecettesEntity } from './recettes.entity';
import { DiversService } from '../calendar/divers/divers.service';
import { DaysService } from '../calendar/days/days.service';

@Injectable()
export class RecettesService {
  constructor(
    @InjectRepository(RecettesEntity) private _recettesEntityRepository: Repository<RecettesEntity>,
    private _diversService: DiversService,
    private _daysService: DaysService,
  ) {}

  async getRecettes(): Promise<ItemBase[]> {
    const query = this._recettesEntityRepository
      .createQueryBuilder('a')
      .select('*')
      .where('a.id is not null')
      .orderBy({ id: 'ASC' })
      .getRawMany();
    if (!query) {
      throw new NotFoundException();
    }
    return query;
  }

  async postRecette(recette: RecettesCreateDto): Promise<ItemBase> {
    const entity = this._recettesEntityRepository.create({ ...recette, itemType: ItemType.RECETTE });
    if (!entity) {
      throw new NotFoundException();
    }

    return this._recettesEntityRepository.save(entity);
  }

  async putRecette(id: number, recette: RecettesUpdateDto): Promise<ItemBase> {
    const entity = await this._recettesEntityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    await this._recettesEntityRepository.update({ id }, { ...recette });
    return this._recettesEntityRepository.findOneBy({ id });
  }

  async removeRecette(id: number): Promise<void> {
    const entity = await this._recettesEntityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }

    const existInDivers = await this._diversService.removeForbiddenIfExisting(id, ItemType.RECETTE);
    const existInDays = await this._daysService.removeForbiddenIfExisting(id, ItemType.RECETTE);

    if (!!existInDivers || !!existInDays) {
      const existIn = [existInDivers, existInDays].filter(item => !!item);
      throw new ForbiddenException(`Recette utilisée dans ${existIn.join(', ')}`);
    }

    await this._recettesEntityRepository.remove(entity);
  }

  async removeForbiddenIfExisting(id: number): Promise<string> {
    const existing = await this._recettesEntityRepository.findOneBy({ id: id });
    // TODO indiquer quelle recette
    if (existing) {
      return 'recettes';
    }
  }
}
