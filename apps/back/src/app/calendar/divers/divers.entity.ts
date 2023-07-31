import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticlesEntity } from '../../articles/articles.entity';
import { RecettesEntity } from '../../recettes/recettes.entity';

@Entity({
  name: 'divers',
})
export class DiversEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  articleId: number;

  @Column({ nullable: true })
  recetteId: number;

  @ManyToOne(() => ArticlesEntity, article => article.diversArticle, { nullable: true })
  @JoinColumn({ name: 'articleId' })
  article: ArticlesEntity;

  @ManyToOne(() => RecettesEntity, recette => recette.recetteArticle, { nullable: true })
  @JoinColumn({ name: 'recetteId' })
  recette: RecettesEntity;
}
