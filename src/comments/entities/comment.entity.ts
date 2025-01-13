import { ObjectType, Field } from '@nestjs/graphql';
import { Blog } from 'src/blog/entities/blog.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
@ObjectType()
@Entity()
export class Comment {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'comment description', nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ description: 'comment name', nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field({ description: 'comment email', nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field({ description: 'comment date', nullable: true })
  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  createdAt: Date;

  @Field({ description: 'comment update', nullable: true })
  @Column({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @Field({ description: 'blog comment', nullable: true })
  @Column({ nullable: true })
  blogId: string;

  @Field({ description: 'userId comment', nullable: true })
  @Column({ nullable: true })
  userId: string;

  @Field({ description: 'parentId comment', nullable: true })
  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => User, (user) => user.comment)
  @Field(() => User, { description: 'user comment', nullable: true })
  user: User;

  @ManyToOne(() => Blog, (blog) => blog.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => Blog, { description: 'blog files', nullable: true })
  blog: Blog;

  @OneToMany(() => Comment, (comment) => comment.parent, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Comment], { description: 'child comment', nullable: true })
  child: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.child, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => Comment, { description: 'parent comment' })
  parent: Comment;
}
