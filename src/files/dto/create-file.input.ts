import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {
  @Field({ description: 'file name', nullable: true })
  name: string;

  @Field({ description: 'image', nullable: true })
  image: string;

  @Field({ description: 'audio', nullable: false })
  audio: string;

  @Field({ description: 'video', nullable: false })
  video: string;

  @Field({ description: 'GIF', nullable: true })
  gif: string;

  @Field({ description: 'documents', nullable: true })
  document: string;
}
