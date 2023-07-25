import { Injectable } from '@nestjs/common';
import { ArticleList, ArticleTags, ItemBase } from '@shared-interfaces/items';
import { CoursesPurchasedDto, CoursesDto, CoursesQuantityDto } from './courses.dto';

@Injectable()
export class CoursesService {
  async getCourses(): Promise<ArticleList[]> {
    const articles: ArticleList[] = [
      {
        id: 1,
        label: 'Article 1',
        quantity: 7,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.EPICERIE],
      },
      {
        id: 3,
        label: 'Article 2',
        quantity: 7,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.ENTRETIEN],
      },
      {
        id: 4,
        label: 'Article 3',
        quantity: 7,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.ENTRETIEN],
      },
      {
        id: 5,
        label: 'Article 4',
        quantity: 7,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.BOISSONS],
      },
      {
        id: 8,
        label: 'Article 16',
        quantity: 7,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.EPICERIE],
      },
    ];
    return articles;
  }

  async postArticle(article: CoursesDto): Promise<ItemBase> {
    return Promise.resolve(undefined);
  }

  async updateQuantity(body: CoursesQuantityDto): Promise<void> {
    return Promise.resolve(undefined);
  }

  async updatePurchasedStatus(body: CoursesPurchasedDto): Promise<void> {
    return Promise.resolve(undefined);
  }
}
