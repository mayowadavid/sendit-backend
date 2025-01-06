import { CreateSecurityQuestionInput } from './create-security-question.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSecurityQuestionInput extends PartialType(
  CreateSecurityQuestionInput,
) {
  @Field(() => Int)
  id: number;
}
