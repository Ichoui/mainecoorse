import { Injectable, NotFoundException } from '@nestjs/common';
import { CoursesArticleList, ItemBase } from '@shared-interfaces/items';
import { CoursesDto, CoursesPurchasedDto, CoursesQuantityDto } from './courses.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesEntity } from './courses.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(CoursesEntity) private _coursesEntityRepository: Repository<CoursesEntity>) {}

  async getCourses(): Promise<CoursesArticleList[]> {
    const queryArticle: CoursesArticleList[] = await this._coursesEntityRepository
      .createQueryBuilder('courses')
      .select('article.id, article.label, article.tags, article.url, courses.quantity, courses.purchased')
      .leftJoin('courses.articleId', 'article')
      .where('courses.articleId is not null')
      .getRawMany();
    if (!queryArticle) {
      throw new NotFoundException();
    }
    return queryArticle;
  }

  async postArticle(article: CoursesDto[]): Promise<void> {
    return Promise.resolve(undefined);
  }

  async updateQuantity(id: number, body: CoursesQuantityDto): Promise<void> {
    const item = await this._coursesEntityRepository.findOne({ where: { articleId: id } });
    const entity = this._coursesEntityRepository.create({ ...item, ...body });
    await this._coursesEntityRepository.save(entity);
  }

  async updatePurchasedStatus(id: number, body: CoursesPurchasedDto): Promise<void> {
    const item = await this._coursesEntityRepository.findOne({ where: { articleId: id } });
    const entity = this._coursesEntityRepository.create({ ...item, ...body });
    await this._coursesEntityRepository.save(entity);
  }

  async removeArticles(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
