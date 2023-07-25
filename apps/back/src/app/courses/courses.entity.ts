import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticlesEntity } from '../articles/articles.entity';

@Entity({
  name: 'courses',
})
export class CoursesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => ArticlesEntity, article => article.coursesArticleId)
  @JoinColumn({ name: 'articleId' })
  articleId: number;

  @Column()
  quantity: number;

  @Column()
  purchased: boolean;
}
