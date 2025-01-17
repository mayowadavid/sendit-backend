import { InputType, Int, Field } from '@nestjs/graphql';
import { packageStatus } from '../entities/package.entity';

@InputType()
export class CreatePackageInput {
  @Field({ description: 'sender Name', nullable: true })
  senderName: string;

  @Field({ description: 'sender Email', nullable: true })
  senderEmail: string;

  @Field({ description: 'sender Phone Number', nullable: true })
  senderPhoneNumber: string;

  @Field({ description: 'sender Gender', nullable: true })
  senderGender: string;

  @Field({ description: 'receiver Name', nullable: true })
  receiverName: string;

  @Field({ description: 'receiver Address', nullable: true })
  receiverAddress: string;

  @Field({ description: 'receiver Email', nullable: true })
  receiverEmail: string;

  @Field({ description: 'receiver Phone Number', nullable: true })
  receiverPhoneNumber: string;

  @Field({ description: 'receiver Gender', nullable: true })
  receiverGender: string;

  @Field({ description: 'worth', nullable: true })
  worth: string;

  @Field({ description: 'quantity', nullable: true })
  quantity: string;

  @Field({ description: 'measurement', nullable: true })
  measurement: string;

  @Field({ description: 'size', nullable: true })
  size: string;

  @Field({ description: 'service Fee', nullable: true })
  serviceFee: string;

  @Field({ description: 'description', nullable: true })
  description: string;

  @Field({ description: 'package status', nullable: true })
  status: packageStatus;

  @Field({ description: 'pick up location', nullable: true })
  pickUp: string;

  @Field({ description: 'package destination', nullable: true })
  destination: string;

  @Field({ description: 'imagesId', nullable: true })
  imagesId: string;
}
