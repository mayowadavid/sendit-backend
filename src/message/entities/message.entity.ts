import { ObjectType, Field } from '@nestjs/graphql';
import { Chat } from 'src/chat/entities/chat.entity';
import { File } from 'src/files/entities/file.entity';
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
export class Message {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'message date', nullable: true })
  @Column({ nullable: true })
  date: string;

  @Field({ description: 'message time', nullable: true })
  @Column({ nullable: true })
  time: string;

  @Field({ description: 'message description', nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ description: 'user Id', nullable: true })
  @Column({ nullable: true })
  userId: string;

  @Field({ description: 'message file Id', nullable: true })
  @Column({ nullable: true })
  fileId: string;

  @Field({ description: 'order Id', nullable: true })
  @Column({ nullable: true })
  orderId: string;

  @Field({ description: 'message chat Id', nullable: true })
  @Column({ nullable: true })
  chatId: string;

  @ManyToOne(() => User, (user) => user.message)
  @Field(() => User, { description: 'chat messages', nullable: true })
  user: string;

  @OneToMany(() => File, (file) => file.message)
  @Field(() => [File], { description: 'message file', nullable: true })
  file: File[];

  @ManyToOne(() => Chat, (chat) => chat.message)
  @Field(() => Chat, { description: 'chat messages', nullable: true })
  chat: Chat;
}
