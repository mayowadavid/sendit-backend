import { ObjectType, Field, Int } from '@nestjs/graphql';
import { File } from 'src/files/entities/file.entity';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { IsOptional, IsPositive } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

export enum BlogStatus {
  DRAFT = 'draft',
  PAUSED = 'paused',
  ACTIVE = 'active',
}

export enum BlogType {
  POST = 'post',
  PAGE = 'page',
}

@ObjectType()
@Entity()
export class Blog {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'blog title', nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field({ description: 'blog content', nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ description: 'blog content mark down', nullable: true })
  @Column({ nullable: true })
  descriptionMarkDown: string;

  @Field({ description: 'blog status', nullable: true })
  @Column({
    nullable: true,
    type: 'enum',
    enum: BlogStatus,
    default: 'draft',
  })
  status: BlogStatus;

  @Field({ description: 'blog type', nullable: true })
  @Column({
    nullable: true,
    type: 'enum',
    enum: BlogType,
    default: 'post',
  })
  type: BlogType;

  @Field({ description: 'blog slug', nullable: true })
  @Column({ nullable: true })
  slug: string;

  @Field(() => Int, { description: 'page', defaultValue: 1, nullable: true })
  @Column({ nullable: true })
  page: number;

  @Field(() => Int, { description: 'page', defaultValue: 10, nullable: true })
  @Column({ nullable: true })
  limit: number;

  @Field({ description: 'blog category id', nullable: true })
  @Column({ nullable: true })
  categoryId: string;

  @Field({ description: 'blog file id', nullable: true })
  @Column({ nullable: true })
  fileId: string;

  @Field({ description: 'blog comment id', nullable: true })
  @Column({ nullable: true })
  commentId: string;

  @Field({ description: 'blog user id', nullable: true })
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.blog, {
    cascade: false,
  })
  @Field(() => User, { description: 'blog category', nullable: true })
  user: User;

  @ManyToOne(() => Category, (category) => category.blog, {
    cascade: false,
  })
  @JoinColumn()
  @Field(() => Category, { description: 'blog category', nullable: true })
  category: Category;

  @OneToOne(() => File, (file) => file.blog, {
    cascade: false,
  })
  @JoinColumn()
  @Field(() => File, { description: 'blog image', nullable: true })
  file: File;

  @OneToMany(() => Comment, (comments) => comments.blog, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => [Comment], { description: 'blog comment', nullable: true })
  comments: Comment[];

  @Field({ description: 'blog date', nullable: true })
  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  createdAt: Date;

  @Field({ description: 'blog update', nullable: true })
  @Column({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;
}
