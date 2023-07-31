import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticlesEntity } from '../../articles/articles.entity';
import { RecettesEntity } from '../../recettes/recettes.entity';
import { EDays } from '@shared-interfaces/items';

@Entity({
  name: 'days',
})
export class DaysEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: EDays, nullable: false, default: undefined })
  slug: EDays;

  @Column({ nullable: true })
  articleId: number;

  @Column({ nullable: true })
  recetteId: number;

  // RELATIONS
  @ManyToOne(() => ArticlesEntity, article => article.daysArticle, { nullable: true })
  @JoinColumn({ name: 'articleId' })
  article: ArticlesEntity;

  @ManyToOne(() => RecettesEntity, recette => recette.daysRecette, { nullable: true })
  @JoinColumn({ name: 'recetteId' })
  recette: RecettesEntity;
}
