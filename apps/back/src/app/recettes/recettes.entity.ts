import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleList, ItemBase, ItemType, Tags } from '@shared-interfaces/items';
import { ArticlesEntity } from '../articles/articles.entity';

@Entity({
  name: 'recettes',
})
export class RecettesEntity extends BaseEntity implements ItemBase {
  @PrimaryGeneratedColumn('increment')
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

  // @OneToMany(() => ArticlesEntity, art => art.id)
  @Column('jsonb')
  articlesList: ArticleList[];
}
