import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field({ description: 'comment description', nullable: true })
  description: string;

  @Field({ description: 'comment date', nullable: true })
  createdAt: string;

  @Field({ description: 'blog comment', nullable: true })
  blogId: string;

  @Field({ description: 'userId comment', nullable: true })
  userId: string;
}
