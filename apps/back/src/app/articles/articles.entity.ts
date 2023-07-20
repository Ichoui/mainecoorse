import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ItemBase, ItemType, Tags } from '@shared-interfaces/items';

@Entity({
  name: 'articles',
})
export class ArticlesEntity extends BaseEntity implements ItemBase {
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
}
