import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Package {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'sender Name', nullable: true })
  @Column({ nullable: true })
  senderName: string;

  @Field({ description: 'sender Email', nullable: true })
  @Column({ nullable: true })
  senderEmail: string;

  @Field({ description: 'sender Phone Number', nullable: true })
  @Column({ nullable: true })
  senderPhoneNumber: string;

  @Field({ description: 'sender Gender', nullable: true })
  @Column({ nullable: true })
  senderGender: string;

  @Field({ description: 'receiver Name', nullable: true })
  @Column({ nullable: true })
  receiverName: string;

  @Field({ description: 'receiver Address', nullable: true })
  @Column({ nullable: true })
  receiverAddress: string;

  @Field({ description: 'receiver Email', nullable: true })
  @Column({ nullable: true })
  receiverEmail: string;

  @Field({ description: 'receiver Phone Number', nullable: true })
  @Column({ nullable: true })
  receiverPhoneNumber: string;

  @Field({ description: 'receiver Gender', nullable: true })
  @Column({ nullable: true })
  receiverGender: string;

  @Field({ description: 'worth', nullable: true })
  @Column({ nullable: true })
  worth: string;

  @Field({ description: 'quantity', nullable: true })
  @Column({ nullable: true })
  quantity: string;

  @Field({ description: 'measurement', nullable: true })
  @Column({ nullable: true })
  measurement: string;

  @Field({ description: 'service Fee', nullable: true })
  @Column({ nullable: true })
  serviceFee: string;

  @Field({ description: 'description', nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ description: 'file', nullable: true })
  @Column({ nullable: true })
  file: string;

  @OneToOne(() => User, (user) => user.package)
  @Field(() => User, { description: 'user' })
  user: User;
}
