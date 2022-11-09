import { CreateNotificationInput } from './create-notification.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationInput extends PartialType(
  CreateNotificationInput,
) {
  @Field()
  id: string;

  @Field({ description: 'notification name)', nullable: true })
  name: string;

  @Field({ description: 'notification description)', nullable: true })
  description: string;

  @Field({ description: 'notification date)', nullable: true })
  createdAt: string;

  @Field({ description: 'notification date)', nullable: true })
  userId: string;
}
