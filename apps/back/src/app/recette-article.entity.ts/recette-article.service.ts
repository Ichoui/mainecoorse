import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetteArticleEntity } from './recette-article.entity';
import { ArticlesListDto } from '../recettes/recettes.dto';

@Injectable()
export class RecetteArticleService {
  constructor(
    @InjectRepository(RecetteArticleEntity) private _recettesArticleEntityRepository: Repository<RecetteArticleEntity>,
  ) {}

  async upsertRecetteArticleRelation(recetteId: number, articles: ArticlesListDto[], put = false): Promise<number[]> {
    let entities = [];
    if (put) {
      const findExistingEntities = await this._recettesArticleEntityRepository.find({
        where: { recetteId: recetteId },
      });
      const articlesToUpdate = [];
      const articlesToCreate = [];
      const articlesToRemove = [];

      articles.forEach(art => {
        if (!findExistingEntities.find(e => e.articleId === art.id)) {
          // Existe que dans article, on créé
          articlesToCreate.push({
            quantity: art.quantity,
            articleId: art.id,
            recetteId: recetteId,
          });
        }
      });

      findExistingEntities.forEach(entity => {
        const existingEntity = articles.find(a => a.id === entity.articleId);
        if (existingEntity) {
          // Existe dans les recettes et dans article, on update
          articlesToUpdate.push({ ...entity, quantity: existingEntity.quantity });
        } else {
          // Existe dans les recettes mais pas dans article, on remove
          articlesToRemove.push(entity);
        }
      });

      entities = articlesToUpdate.concat(articlesToCreate);

      return await this._recettesArticleEntityRepository
        .save(entities)
        .then(res => {
          if (articlesToRemove.length > 0) {
            this._recettesArticleEntityRepository.remove(articlesToRemove).catch((error) => {
              // pas beau mais faut aller manger et j'ai pas envie de le faire bien, si toi, openSourceLover tu me vois, ne me juge pas :D
              // TODO à refaire car ça pète en prod...
              throw new NotFoundException(error, 'Erreur suppression when upsert');
            });
          }
          return res;
        })
        .then(res => res.map(r => r.id))
        .catch((error) => {
          throw new NotFoundException(error,'Erreur enregistrement quand upsert');
        });
    }

    if (!put) {
      articles.forEach(article => {
        const entity = this._recettesArticleEntityRepository.create({
          quantity: article.quantity,
          articleId: article.id,
          recetteId: recetteId,
        });
        if (!entity) {
          throw new NotFoundException('Erreur création entité RecetteArticle');
        }
        entities.push(entity);
      });
      return this._recettesArticleEntityRepository.save(entities).then(res => res.map(r => r.id));
    }
  }

  async removeRecetteArticleRelation(recetteId: number): Promise<void> {
    const entities = await this._recettesArticleEntityRepository.find({ where: { recetteId: recetteId } });
    await this._recettesArticleEntityRepository.remove(entities).catch((error) => {
      throw new NotFoundException(error,'Erreur suppression relation RecetteArticle');
    });
  }

  async removeForbiddenIfExisting(id: number): Promise<string> {
    const existing = await this._recettesArticleEntityRepository.find({
      relations: ['recette'],
      where: { articleId: id },
    });
    const arr: string[] = [];
    existing.map(ra => arr.push(ra.recette.label));
    const message =
      arr.length > 2 ? `les recettes ${arr.filter((a, i) => i < 2).join(', ')}` : `les recettes ${arr.join(', ')}`;

    if (existing) {
      return `les recettes ${message}`;
    }
  }
}
