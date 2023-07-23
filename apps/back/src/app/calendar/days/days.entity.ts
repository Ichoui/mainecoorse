import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticlesEntity } from '../../articles/articles.entity';
import { RecettesEntity } from '../../recettes/recettes.entity';
import { EDays } from '@shared-interfaces/items';

@Entity({
  name: 'days',
})
export class DaysEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: EDays, nullable: false, default: undefined })
  slug: EDays;

  @Column({ nullable: true })
  @ManyToOne(() => ArticlesEntity, article => article.diversArticleId, { nullable: true })
  @JoinColumn({ name: 'articleId' })
  articleId: number;

  @Column({ nullable: true })
  @ManyToOne(() => RecettesEntity, recette => recette.daysRecetteId, { nullable: true })
  @JoinColumn({ name: 'recetteId' })
  recetteId: number;
}
