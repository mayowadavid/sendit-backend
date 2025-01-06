import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubCategoryInput {
  @Field({ description: 'sub category name', nullable: true })
  name: string;

  @Field({ description: 'category id', nullable: true })
  categoryId: string;
}
