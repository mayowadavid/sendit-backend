import { InputType, Field } from '@nestjs/graphql';
import { categoryStatus } from 'src/categories/entities/category.entity';
@InputType()
export class CreateCategoryInput {
  @Field({ description: 'category name', nullable: true })
  name: string;

  @Field({ description: 'category description', nullable: true })
  description: string;

  @Field({ description: 'category status', nullable: true })
  status: categoryStatus;

  @Field({ description: 'display banner', nullable: true })
  displayBanner: boolean;

  @Field({ description: 'sub category id', nullable: true })
  subCategoryId: string;

  @Field({ description: 'gig id', nullable: true })
  gigId: string;

  @Field({ description: 'blog id', nullable: true })
  blogId: string;
}
