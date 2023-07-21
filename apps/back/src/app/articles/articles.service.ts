import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemBase, ItemType } from '@shared-interfaces/items';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesEntity } from './articles.entity';
import { Repository } from 'typeorm';
import { ArticlesCreateDto, ArticlesUpdateDto } from './articles.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectRepository(ArticlesEntity) private _articlesEntityRepository: Repository<ArticlesEntity>) {}

  async getArticles(): Promise<ItemBase[]> {
    const entity = this._articlesEntityRepository
      .createQueryBuilder('a')
      .select('*')
      .where('a.id is not null')
      .getRawMany();

    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  async postArticles(articles: ArticlesCreateDto): Promise<ItemBase> {
    const entity = this._articlesEntityRepository.create({ ...articles, itemType: ItemType.ARTICLE });
    if (!entity) {
      throw new NotFoundException();
    }
    return this._articlesEntityRepository.save(entity);
  }

  async putArticles(id: number, articles: ArticlesUpdateDto): Promise<ItemBase> {
    const entity = this._articlesEntityRepository.update({ id }, { ...articles });
    if (!entity) {
      throw new NotFoundException();
    }
    // return this._articlesEntityRepository.save(entity);
    return null
  }

 async removeArticle(id: number): Promise<void> {
   const entity = await this._articlesEntityRepository.findOne({where: {id}});
   await this._articlesEntityRepository.remove(entity);
 }
}
