import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field({ description: 'message Id', nullable: true })
  messageId: string;

  @Field({ description: 'chat sender id', nullable: true })
  senderId: string;

  @Field({ description: 'chat receiver id', nullable: true })
  receiverId: string;
}
