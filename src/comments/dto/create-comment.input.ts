import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field({ description: 'comment description', nullable: true })
  description: string;

<<<<<<< HEAD
=======
  @Field({ description: 'comment email', nullable: true })
  email: string;

  @Field({ description: 'comment name', nullable: true })
  name: string;

>>>>>>> origin/main
  @Field({ description: 'comment date', nullable: true })
  createdAt: string;

  @Field({ description: 'blog comment', nullable: true })
  blogId: string;

  @Field({ description: 'userId comment', nullable: true })
  userId: string;
<<<<<<< HEAD
=======

  @Field({ description: 'parentId comment', nullable: true })
  parentId: string;
>>>>>>> origin/main
}
