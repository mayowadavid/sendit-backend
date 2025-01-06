import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSecurityQuestionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
