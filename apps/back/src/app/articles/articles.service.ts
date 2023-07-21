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
    const query = this._articlesEntityRepository
      .createQueryBuilder('a')
      .select('*')
      .where('a.id is not null')
      .orderBy({ id: 'ASC'})
      .getRawMany();

    if (!query) {
      throw new NotFoundException();
    }
    return query;
  }

  async postArticle(articles: ArticlesCreateDto): Promise<ItemBase> {
    const entity = this._articlesEntityRepository.create({ ...articles, itemType: ItemType.ARTICLE });
    if (!entity) {
      throw new NotFoundException();
    }
    return this._articlesEntityRepository.save(entity);
  }

  async putArticle(id: number, articles: ArticlesUpdateDto): Promise<ItemBase> {
    const entity = await this._articlesEntityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    await this._articlesEntityRepository.update({ id }, { ...articles });
    return this._articlesEntityRepository.findOneBy({ id });
  }

 async removeArticle(id: number): Promise<void> {
   const entity = await this._articlesEntityRepository.findOneBy({id});
   await this._articlesEntityRepository.remove(entity);
 }
}
