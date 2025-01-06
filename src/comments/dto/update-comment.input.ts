import { CreateCommentInput } from './create-comment.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field()
  id: string;

  @Field({ description: 'comment description', nullable: true })
  description: string;

  @Field({ description: 'comment date', nullable: true })
  createdAt: string;

  @Field({ description: 'blog comment', nullable: true })
  blogId: string;

  @Field({ description: 'userId comment', nullable: true })
  userId: string;
}
