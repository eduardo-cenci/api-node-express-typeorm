import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Category } from './Category';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  public value: number;

  @Column({ type: 'text' })
  public description: string;

  @Column({ type: 'date' })
  public date: Date;

  @ManyToOne(() => Category, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  public category: Category;
}
