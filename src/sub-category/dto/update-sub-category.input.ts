import { CreateSubCategoryInput } from './create-sub-category.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubCategoryInput extends PartialType(
  CreateSubCategoryInput,
) {
  @Field()
  id: string;

  @Field({ description: 'sub category name', nullable: true })
  name: string;

  @Field({ description: 'category id', nullable: true })
  categoryId: string;
}
