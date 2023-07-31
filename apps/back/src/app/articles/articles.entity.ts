import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemBase, ItemType, Tags } from '@shared-interfaces/items';
import { DaysEntity } from '../calendar/days/days.entity';
import { DiversEntity } from '../calendar/divers/divers.entity';
import { CoursesEntity } from '../courses/courses.entity';
import { RecetteArticleEntity } from '../recette-article.entity.ts/recette-article.entity';

@Entity({
  name: 'articles',
})
export class ArticlesEntity extends BaseEntity implements ItemBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column({ type: 'varchar', length: 512 })
  description: string;

  @Column({
    type: 'enum',
    enum: ItemType,
  })
  itemType: ItemType;

  @Column({ type: 'varchar', length: 512 })
  url: string;

  @Column({
    type: 'text',
    array: true,
  })
  tags: string[] | Tags[]; // Tags[] | string[];

  // Relations
  @OneToMany(() => DaysEntity, days => days.article)
  daysArticle: DaysEntity[];

  @OneToMany(() => DiversEntity, divers => divers.article)
  diversArticle: DiversEntity[];

  @OneToMany(() => CoursesEntity, divers => divers.articleId)
  coursesArticleId: CoursesEntity[];

  @OneToMany(() => RecetteArticleEntity, (recetteArticle) => recetteArticle.article)
  recetteArticle: RecetteArticleEntity[];
}
