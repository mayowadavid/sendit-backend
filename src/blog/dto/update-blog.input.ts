import { CreateBlogInput } from './create-blog.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { BlogStatus, BlogType } from '../entities/blog.entity';

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
  @Field()
  id: string;

  @Field({ description: 'blog title', nullable: true })
  name: string;

  @Field({ description: 'blog content', nullable: true })
  description: string;

  @Field({ description: 'blog content mark down', nullable: true })
  descriptionMarkDown: string;

  @Field({ description: 'blog status', nullable: true })
  status: BlogStatus;

  @Field({ description: 'blog slug', nullable: true })
  slug: string;

  @Field(() => Int, { description: 'page', defaultValue: 1, nullable: true })
  page: number;

  @Field(() => Int, { description: 'page', defaultValue: 10, nullable: true })
  limit: number;

  @Field({ description: 'blog type', nullable: true })
  type: BlogType;

  @Field({ description: 'blog file id', nullable: true })
  categoryId: string;

  @Field({ description: 'blog file id', nullable: true })
  fileId: string;

  @Field({ description: 'blog comment id', nullable: true })
  commentId: string;

  @Field({ description: 'blog user id', nullable: true })
  userId: string;
}

