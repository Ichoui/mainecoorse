import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ItemBase, ItemType } from '@shared-interfaces/items';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesEntity } from './articles.entity';
import { Repository } from 'typeorm';
import { ArticlesCreateDto, ArticlesUpdateDto } from './articles.dto';
import { DiversService } from '../calendar/divers/divers.service';
import { DaysService } from '../calendar/days/days.service';
import { CoursesService } from '../courses/courses.service';
import { RecettesService } from '../recettes/recettes.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticlesEntity) private _articlesEntityRepository: Repository<ArticlesEntity>,
    private _diversService: DiversService,
    private _daysService: DaysService,
    private _coursesService: CoursesService,
    private _recettesService: RecettesService,
  ) {}

  async getArticles(): Promise<ItemBase[]> {
    const query = this._articlesEntityRepository
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
    const entity = await this._articlesEntityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }

    const existInDivers = await this._diversService.removeForbiddenIfExisting(id, ItemType.ARTICLE);
    const existInDays = await this._daysService.removeForbiddenIfExisting(id, ItemType.ARTICLE);
    const existInCourses = await this._coursesService.removeForbiddenIfExisting(id);
    const existInRecettes = undefined;
    // TODO faire les recettes quand relations OK ! :)
    // const existInRecettes = await this._recettesService.removeForbiddenIfExisting(id);

    if (!!existInDivers || !!existInDays || !!existInCourses || !!existInRecettes) {
      const existIn = [existInDivers, existInDays, existInCourses, existInRecettes].filter(item => !!item);
      throw new ForbiddenException(`Article utilisé dans ${existIn.join(', ')}`);
    }

    await this._articlesEntityRepository.remove(entity);
  }
}
