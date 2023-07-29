import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class SubCategory {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'sub category name', nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field({ description: 'creation date', nullable: true })
  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  createdAt: Date;

  @Field({ description: 'updation date', nullable: true })
  @Column({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @Field({ description: 'sub category id', nullable: true })
  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.subCategory, {
    cascade: false,
  })
  @JoinColumn()
  @Field(() => Category, { description: 'subCategory', nullable: true })
  category: Category;
}
