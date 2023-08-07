import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CoursesArticleList } from '@shared-interfaces/items';
import { CoursesPostDto, CoursesPurchasedDto, CoursesQuantityDto } from './courses.dto';
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
      throw new NotFoundException('Pas d\'articles !');
    }
    return queryArticle;
  }

  async upsertArticles(res: CoursesPostDto): Promise<void> {
    res.articles.map(async item => {
      const existingItem = await this._coursesEntityRepository.findOneBy({ articleId: item.id });
      if (existingItem) {
        // Update existing item
        existingItem.quantity += item.quantity;
        await this._coursesEntityRepository.save(existingItem);
      } else {
        // Create my new item
        await this._coursesEntityRepository.insert({ articleId: item.id, quantity: item.quantity, purchased: false });
      }
    });
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

  async removeArticles(): Promise<CoursesArticleList[]> {
    const queryArticlesToRemove = await this._coursesEntityRepository.find({ where: { purchased: true } });
    if (queryArticlesToRemove.length === 0) {
      throw new HttpException({warning: 'Rien à supprimer ici maggle...'}, HttpStatus.I_AM_A_TEAPOT)
    }
    await this._coursesEntityRepository.remove(queryArticlesToRemove);
    return this.getCourses();
  }

  async removeForbiddenIfExisting(id: number): Promise<string> {
    const existing = await this._coursesEntityRepository.findOneBy({ articleId: id });
    if (existing) {
      return 'courses';
    }
  }
}
