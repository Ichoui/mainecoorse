import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ItemBase, ItemType } from '@shared-interfaces/items';
import { RecettesCreateDto, RecettesUpdateDto } from './recettes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecettesEntity } from './recettes.entity';
import { DiversService } from '../calendar/divers/divers.service';
import { DaysService } from '../calendar/days/days.service';
import { RecetteArticleService } from '../recette-article.entity.ts/recette-article.service';

@Injectable()
export class RecettesService {
  constructor(
    @InjectRepository(RecettesEntity) private _recettesEntityRepository: Repository<RecettesEntity>,
    private _diversService: DiversService,
    private _daysService: DaysService,
    private _recetteArticleService: RecetteArticleService,
  ) {}

  async getRecettes(): Promise<ItemBase[]> {
    const query: ItemBase[] = await this._recettesEntityRepository
      .find({
        relations: ['recetteArticle.article'],
        order: { id: 'ASC' },
      })
      .then(query => {
        return query.map(recette => {
          const articlesList = recette.recetteArticle.map(ra => ({
            id: ra.article.id,
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
      throw new NotFoundException();
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
      throw new NotFoundException();
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
        throw new BadRequestException('Il est arrivé malheur à la relation Recette-Article...');
      });
  }

  // TODO :
  // réussir à PUT la donnée OKKK
  // réussir à GET avec relations OKKKKKKKKKKK
  // reproduire le put avec POST (ça devrait être similaire) OKKK
  // Gérer la suppression (recetteArticle doit être retiré quand recette supprimée)
  // Gérer l'erreur depuis recetteArticle

  async putRecette(id: number, recette: RecettesUpdateDto): Promise<void> {
    console.log('---PUT ! ', recette);
    const entity = await this._recettesEntityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }

    await this._recetteArticleService
      .upsertRecetteArticleRelation(id, recette.articlesList, true)
      .then(articlesList => {
        this._recettesEntityRepository.update({ id }, { ...recette, articlesList });
        // TODO remove old relations !!!!!!!!!
      })
      .catch(err => {
        throw new BadRequestException('Il est arrivé malheur à la relation Recette-Article...', { cause: err });
      });
  }

  async removeRecette(id: number): Promise<void> {
    const entity: RecettesEntity = await this._recettesEntityRepository.findOne({
      relations: ['recetteArticle.article'],
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException();
    }



    const existInDivers = await this._diversService.removeForbiddenIfExisting(id, ItemType.RECETTE);
    const existInDays = await this._daysService.removeForbiddenIfExisting(id, ItemType.RECETTE);

    if (!!existInDivers || !!existInDays) {
      const existIn = [existInDivers, existInDays].filter(item => !!item);
      throw new ForbiddenException(`Recette utilisée dans ${existIn.join(', ')}`);
    }
    // TODO Supprimer dans recetteArticle avant de passer au reste pour éviter une erreur de contrainte !


    const idRelations: number[] = entity.recetteArticle.map(ra => ra.article.id);


    await this._recetteArticleService
      .removeRecetteArticleRelation(entity.id)
      .then(() => this._recettesEntityRepository.remove(entity));
  }
}
