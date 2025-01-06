import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateComplaintInput {
  @Field()
  id: string;

  @Field()
  user: string;

  @Field()
  description: string;
}
