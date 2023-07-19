import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'notes',
})
export class NotesEntity {
  @PrimaryGeneratedColumn('rowid')
  oneId: number;

  @Column()
  notes: string;
}
