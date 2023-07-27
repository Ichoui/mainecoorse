import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemBase } from '@shared-interfaces/items';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetteArticleEntity } from './recette-article.entity';
import { ArticlesListDto } from '../recettes/recettes.dto';

@Injectable()
export class RecetteArticleService {
  constructor(
    @InjectRepository(RecetteArticleEntity) private _recettesArticleEntityRepository: Repository<RecetteArticleEntity>,
  ) {}

  async findRecetteArticleRelation(): Promise<ItemBase[]> {
    console.log('ef');
    return [];
  }

  async upsertRecetteArticleRelation(recetteId: number, articles: ArticlesListDto[], put = false): Promise<number[]> {
    const entities = [];
    if (put) {
      // TODO find old relations and remove them, on PUT method
      // OR method 2, update existing relations
    }

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

  async removeRecetteArticleRelation(recetteId: number): Promise<void> {
    const entities = await this._recettesArticleEntityRepository.find({ where: { recetteId: recetteId } });
    await this._recettesArticleEntityRepository.remove(entities).catch(() => {
      throw new NotFoundException('Erreur suppression relation RecetteArticle');
    });
  }

  async removeForbiddenIfExisting(id: number): Promise<string> {
    const existing = await this._recettesArticleEntityRepository.findOneBy({ id: id });
    // TODO indiquer quelle recette ou article est concerné
    if (existing) {
      return 'recettes';
    }
  }
}
