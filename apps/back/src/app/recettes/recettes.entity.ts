import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleList, ItemBase, ItemType, Tags } from '@shared-interfaces/items';
import { DaysEntity } from '../calendar/days/days.entity';
import { DiversEntity } from '../calendar/divers/divers.entity';

@Entity({
  name: 'recettes',
})
export class RecettesEntity extends BaseEntity implements ItemBase {
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

  @Column('jsonb')
  articlesList: ArticleList[];

  // Relations
  @OneToMany(() => DaysEntity, days => days.recetteId)
  daysRecetteId: DaysEntity[];

  @OneToMany(() => DiversEntity, divers => divers.recetteId)
  diversRecetteId: DiversEntity[];
}
