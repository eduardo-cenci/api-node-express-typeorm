import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'text' })
  public description: string;
}
