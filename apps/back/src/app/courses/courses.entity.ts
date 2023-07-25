import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'courses',
})
export class CoursesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articleId: number;

  @Column()
  quantity: number;

  @Column()
  purchased: boolean;
}
