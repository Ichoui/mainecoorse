import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ItemBase, ItemType } from '@shared-interfaces/items';
import { RecettesCreateDto, RecettesUpdateDto } from './recettes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecettesEntity } from './recettes.entity';
import { DiversService } from '../calendar/divers/divers.service';
import { DaysService } from '../calendar/days/days.service';
import { RecetteArticleService } from '../recette-article/recette-article.service';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class RecettesService {
  constructor(
    @InjectRepository(RecettesEntity) private _recettesEntityRepository: Repository<RecettesEntity>,
    private _settingsService: SettingsService,
    private _diversService: DiversService,
    private _daysService: DaysService,
    private _recetteArticleService: RecetteArticleService,
  ) {}

  async getRecettes(): Promise<ItemBase[]> {
    const flag = await this._settingsService.getFlag();
    const query: ItemBase[] = await this._recettesEntityRepository
      .find({
        relations: ['recetteArticle.article'],
        order: { id: 'ASC' },
        where: { flag },
      })
      .then(query => {
        return query.map(recette => {
          const articlesList = recette.recetteArticle.map(ra => ({
            id: ra.article.id,
            url: ra.article.url,
            quantity: ra.quantity,
            label: ra.article.label,
          }));
          delete recette.recetteArticle;
          return {
            ...recette,
            articlesList,
          };
        });
      });

    if (!query) {
      throw new NotFoundException('Aucune recette listée');
    }
    return query;
  }

  async postRecette(recette: RecettesCreateDto): Promise<void> {
    const entity = this._recettesEntityRepository.create({
      ...recette,
      itemType: ItemType.RECETTE,
      articlesList: recette.articlesList.map(a => a.id),
    });

    if (!entity) {
      throw new NotFoundException('Impossible de créer la recette');
    }
    let recetteId: number;
    await this._recettesEntityRepository
      .save(entity)
      .then(res => res.id)
      .then(id => {
        recetteId = id;
        return this._recetteArticleService.upsertRecetteArticleRelation(recetteId, recette.articlesList);
      })
      .catch(() => {
        this.removeRecette(recetteId);
        throw new BadRequestException('Il est arrivé malheur à la relation Recette-Article en création...');
      });
  }

  async putRecette(id: number, recette: RecettesUpdateDto): Promise<void> {
    const entity = await this._recettesEntityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException("Impossible d'éditer la recette");
    }

    await this._recetteArticleService
      .upsertRecetteArticleRelation(id, recette.articlesList, true)
      .then(articlesList => this._recettesEntityRepository.update({ id }, { ...recette, articlesList }))
      .catch(err => {
        throw new BadRequestException('Il est arrivé malheur à la relation Recette-Article en édition...', {
          cause: err,
        });
      });
  }

  async removeRecette(id: number): Promise<void> {
    const entity: RecettesEntity = await this._recettesEntityRepository.findOne({
      relations: ['recetteArticle.article'],
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException('Impossible de supprimer la recette');
    }
    // Test first if used in divers / days calendar...
    const existInDivers = await this._diversService.removeForbiddenIfExisting(id, ItemType.RECETTE);
    const existInDays = await this._daysService.removeForbiddenIfExisting(id, ItemType.RECETTE);

    if (!!existInDivers || !!existInDays) {
      const existIn = [existInDivers, existInDays].filter(item => !!item);
      throw new ForbiddenException(`Recette utilisée dans ${existIn.join(', ')}`);
    }
    // ... then remove relations and then remove entity
    await this._recetteArticleService
      .removeRecetteArticleRelation(entity.id)
      .then(() => this._recettesEntityRepository.remove(entity));
  }
}
