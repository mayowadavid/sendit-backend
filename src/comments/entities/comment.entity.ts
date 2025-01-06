import { ObjectType, Field } from '@nestjs/graphql';
import { Blog } from 'src/blog/entities/blog.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

  @Field({ description: 'comment date', nullable: true })
  @Column({ nullable: true })
  createdAt: string;

  @Field({ description: 'blog comment', nullable: true })
  @Column({ nullable: true })
  blogId: string;

  @Field({ description: 'userId comment', nullable: true })
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.comment)
  @Field(() => User, { description: 'user comment', nullable: true })
  user: User;

  @ManyToOne(() => Blog, (blog) => blog.comments, {
    onDelete: 'CASCADE',
  })
  @Field(() => Blog, { description: 'blog files' })
  blog: Blog;
}
