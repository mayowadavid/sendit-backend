import { ObjectType, Field } from '@nestjs/graphql';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@ObjectType()
@Entity()
export class Chat {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'chat sender id', nullable: true })
  @Column({ nullable: true })
  senderId: string;

  @Field({ description: 'chat receiver id', nullable: true })
  @Column({ nullable: true })
  receiverId: string;

  @ManyToOne(() => User, (user) => user.sender)
  @Field(() => User, { description: 'user sender chat', nullable: true })
  sender: User;

  @ManyToOne(() => User, (user) => user.receiver)
  @Field(() => User, { description: 'user receiver chat', nullable: true })
  receiver: User;

  @Field({ description: 'chat messages', nullable: true })
  @Column({ nullable: true })
  messageId: string;

  @OneToMany(() => Message, (message) => message.chat)
  @Field(() => [Message], { description: 'chat messages', nullable: true })
  message: Message[];
}
