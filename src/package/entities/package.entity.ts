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
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';

export enum packageStatus {
  INCOMPLETE = 'incomplete',
  PENDING = 'pending',
  INTRANSIT = 'intransit',
  DELIVERED = 'delivered',
}

@ObjectType()
@Entity()
export class allPackage {
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

  @Field({ description: 'pick up location', nullable: true })
  @Column({ nullable: true })
  pickUp: string;

  @Field({ description: 'package destination', nullable: true })
  @Column({ nullable: true })
  destination: string;

  @Field({ description: 'package creation date', nullable: true })
  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  createdAt: Date;

  @Field({ description: 'package updation date', nullable: true })
  @UpdateDateColumn({ type: 'timestamp', precision: 3 })
  @Column({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @Field({ description: 'worth', nullable: true })
  @Column({ nullable: true })
  worth: string;

  @Field({ description: 'quantity', nullable: true })
  @Column({ nullable: true })
  quantity: string;

  @Field({ description: 'measurement', nullable: true })
  @Column({ nullable: true })
  measurement: string;

  @Field({ description: 'size', nullable: true })
  @Column({ nullable: true })
  size: string;

  @Field({ description: 'service Fee', nullable: true })
  @Column({ nullable: true })
  serviceFee: string;

  @Field({ description: 'description', nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ description: 'package status', nullable: true })
  @Column({
    nullable: true,
    type: 'enum',
    enum: packageStatus,
    default: 'incomplete',
  })
  status: packageStatus;

  @Field({ description: 'imagesId', nullable: true })
  @Column({ nullable: true, name: 'imagesId' })
  imagesId: string;

  @OneToMany(() => File, (file) => file.allPackage, {
    cascade: false,
  })
  @Field(() => [File], { description: 'file', nullable: true })
  images: File[];

  @ManyToOne(() => User, (user) => user.package)
  @Field({ description: 'file', nullable: true })
  @Column({ nullable: true })
  file: string;

  @OneToOne(() => User, (user) => user.package)
  @Field(() => User, { description: 'user' })
  user: User;
}
