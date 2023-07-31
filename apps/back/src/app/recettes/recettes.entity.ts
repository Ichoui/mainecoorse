import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemType, Tags } from '@shared-interfaces/items';
import { DaysEntity } from '../calendar/days/days.entity';
import { DiversEntity } from '../calendar/divers/divers.entity';
import { RecetteArticleEntity } from '../recette-article.entity.ts/recette-article.entity';

@Entity({
  name: 'recettes',
})
export class RecettesEntity extends BaseEntity {
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
  tags: string[] | Tags[];

  @Column('int', { array: true, nullable: true })
  articlesList: number[];

  // Relations
  @OneToMany(() => RecetteArticleEntity, recetteArticle => recetteArticle.recette, { nullable: true })
  recetteArticle?: RecetteArticleEntity[];

  @OneToMany(() => DaysEntity, days => days.recette)
  daysRecette: DaysEntity[];

  @OneToMany(() => DiversEntity, divers => divers.recetteId)
  diversRecetteId: DiversEntity[];
}
