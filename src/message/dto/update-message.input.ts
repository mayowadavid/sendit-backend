import { CreateMessageInput } from './create-message.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {
  @Field()
  id: string;

  @Field({ description: 'message date', nullable: true })
  date: string;

  @Field({ description: 'message time', nullable: true })
  time: string;

  @Field({ description: 'message description', nullable: true })
  description: string;

  @Field({ description: 'user Id', nullable: true })
  userId: string;

  @Field({ description: 'message file Id', nullable: true })
  fileId: string;

  @Field({ description: 'order Id', nullable: true })
  orderId: string;

  @Field({ description: 'message chat Id', nullable: true })
  chatId: string;
}
