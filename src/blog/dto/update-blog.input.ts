import { CreateBlogInput } from './create-blog.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { BlogStatus } from '../entities/blog.entity';

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
  @Field()
  id: string;

  @Field({ description: 'blog title', nullable: true })
  name: string;

  @Field({ description: 'blog date', nullable: true })
  createdAt: string;

  @Field({ description: 'blog content', nullable: true })
  description: string;

  @Field({ description: 'blog content mark down', nullable: true })
  descriptionMarkDown: string;

  @Field({ description: 'blog status', nullable: true })
  status: BlogStatus;

  @Field({ description: 'blog slug', nullable: true })
  slug: string;

  @Field({ description: 'blog file id', nullable: true })
  categoryId: string;

  @Field({ description: 'blog file id', nullable: true })
  fileId: string;

  @Field({ description: 'blog comment id', nullable: true })
  commentId: string;

  @Field({ description: 'blog user id', nullable: true })
  userId: string;
}
