import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticlesEntity } from '../articles/articles.entity';
import { RecettesEntity } from '../recettes/recettes.entity';

@Entity({
  name: 'recetteArticle',
})
export class RecetteArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articleId: number;

  @Column()
  recetteId: number;

  @ManyToOne(() => ArticlesEntity, article => article.recetteArticle)
  @JoinColumn({ name: 'articleId' })
  article: ArticlesEntity;

  @ManyToOne(() => RecettesEntity, recette => recette.recetteArticle)
  @JoinColumn({ name: 'recetteId' })
  recette: RecettesEntity;

  @Column('float')
  quantity: number;
}
