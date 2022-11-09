import { CreateComplaintInput } from './create-complaint.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateComplaintInput extends PartialType(CreateComplaintInput) {
  @Field()
  id: string;

  @Field()
  user: string;

  @Field()
  description: string;
}
