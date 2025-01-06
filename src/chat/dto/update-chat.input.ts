import { CreateChatInput } from './create-chat.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChatInput extends PartialType(CreateChatInput) {
  @Field()
  id: string;

  @Field({ description: 'message Id', nullable: true })
  messageId: string;

  @Field({ description: 'chat sender id', nullable: true })
  senderId: string;

  @Field({ description: 'chat receiver id', nullable: true })
  receiverId: string;
}
