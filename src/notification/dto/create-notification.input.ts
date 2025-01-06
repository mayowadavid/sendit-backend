import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field({ description: 'notification name)', nullable: true })
  name: string;

  @Field({ description: 'notification description)', nullable: true })
  description: string;

  @Field({ description: 'notification date)', nullable: true })
  createdAt: string;

  @Field({ description: 'notification date)', nullable: true })
  userId: string;
}
