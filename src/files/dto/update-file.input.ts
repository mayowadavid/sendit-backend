import { CreateFileInput } from './create-file.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFileInput extends PartialType(CreateFileInput) {
  @Field()
  id: string;

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
