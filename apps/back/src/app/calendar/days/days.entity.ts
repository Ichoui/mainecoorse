import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticlesEntity } from '../../articles/articles.entity';
import { RecettesEntity } from '../../recettes/recettes.entity';
import { Days } from '@shared-interfaces/items';

@Entity({
  name: 'days',
})
export class DaysEntity extends BaseEntity implements Days {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  label: string;

  @Column()
  slug: string;

  @Column()
  articleId: number;

  @Column()
  recetteId: number;

  // Relations
  @ManyToOne(() => ArticlesEntity, article => article.articleId)
  @JoinColumn({ name: 'articleId' })
  article: ArticlesEntity[];

  @ManyToOne(() => RecettesEntity, recette => recette.recetteId)
  @JoinColumn({ name: 'recetteId' })
  recette: RecettesEntity[];
}
