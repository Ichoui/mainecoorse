import { Injectable } from '@nestjs/common';
import { ArticleList, ItemBase } from '@shared-interfaces/items';
import { CoursesDto, CoursesPurchasedDto, CoursesQuantityDto } from './courses.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesEntity } from './courses.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(CoursesEntity) private _coursesEntityRepository: Repository<CoursesEntity>) {}

  async getCourses(): Promise<ArticleList[]> {
    const queryArticle: (ArticleList)[] = await this._coursesEntityRepository
      .createQueryBuilder('courses')
      .select(
        'article.id, article.label, article.tags, article.url, courses.quantity, courses.purchased',
      )
      .leftJoin('courses.articleId', 'article')
      .where('courses.articleId is not null')
      .getRawMany();

    if (!queryArticle) {

    }

    return queryArticle;
  }

  async postArticle(article: CoursesDto[]): Promise<ItemBase> {
    return Promise.resolve(undefined);
  }

  async updateQuantity(body: CoursesQuantityDto): Promise<void> {
    return Promise.resolve(undefined);
  }

  async updatePurchasedStatus(body: CoursesPurchasedDto): Promise<void> {
    return Promise.resolve(undefined);
  }

  async removeArticles(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
