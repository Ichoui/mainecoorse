import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'notes',
})
export class NotesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('rowid')
  oneId: number;

  @Column({ type: 'varchar' })
  notes: string;
}
