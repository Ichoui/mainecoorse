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
  @ManyToOne(() => ArticlesEntity, article => article.diversArticleId, { nullable: true })
  @JoinColumn({ name: 'articleId' })
  articleId: number;

  @Column({ nullable: true })
  @ManyToOne(() => RecettesEntity, recette => recette.diversRecetteId, { nullable: true })
  @JoinColumn({ name: 'recetteId' })
  recetteId: number;
}
