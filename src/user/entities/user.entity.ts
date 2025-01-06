import { ObjectType, Field } from '@nestjs/graphql';
import { Profile } from 'src/profile/entities/profile.entity';
import { Earning } from 'src/earnings/entities/earning.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { Message } from '../../message/entities/message.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { allPackage } from 'src/package/entities/package.entity';

export enum UserStatus {
  BANNED = 'banned',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'client username', nullable: true })
  @Column({ nullable: true, unique: true })
  userName: string;

  @Field({ description: 'client email', nullable: true })
  @Column({ nullable: true, unique: true })
  email: string;

  @Field({ description: 'password', nullable: true })
  @Column({ nullable: true })
  password: string;

  @Field({ description: 'refresh token', nullable: true })
  @Column({ nullable: true, name: 'refreshtoken' })
  refreshToken: string;

  @Field({ description: 'orderId', nullable: true })
  @Column({ nullable: true, name: 'orderId' })
  orderId: string;

  @Field({ description: 'referal code', nullable: true })
  @Column({ type: 'date', nullable: true, name: 'referalCode' })
  referalCode: string;

  @Field({ description: 'refresh tokesn exp', nullable: true })
  @Column({ type: 'date', nullable: true, name: 'refreshtokenexp' })
  refreshTokenExp: string;

  @Field({ description: 'user status', nullable: true })
  @Column({
    nullable: true,
    type: 'enum',
    enum: UserStatus,
    default: 'pending',
  })
  status: UserStatus;

  @OneToMany(() => Notification, (notification) => notification.user)
  @Field(() => [Notification], {
    description: 'user notification',
    nullable: true,
  })
  notification: Notification[];

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  @Field(() => Profile, { description: 'chat profile', nullable: true })
  profile: Profile;

  @OneToMany(() => allPackage, (allpackage) => allpackage.user)
  @Field(() => [allPackage], { description: 'user package', nullable: true })
  package: allPackage[];

  @OneToOne(() => Earning, (earning) => earning.user)
  @JoinColumn()
  @Field(() => Earning, { description: 'user earning', nullable: true })
  earning: Earning;

  @OneToMany(() => Chat, (chat) => chat.receiver)
  @Field(() => [Chat], { description: 'user orders client', nullable: true })
  receiver: Chat[];

  @OneToMany(() => Chat, (chat) => chat.sender)
  @Field(() => [Chat], { description: 'user orders seller', nullable: true })
  sender: Chat[];

  @OneToMany(() => Message, (message) => message.user)
  @Field(() => [Message], { description: 'user messages' })
  message: Message[];

  @OneToMany(() => Blog, (blog) => blog.user, {
    cascade: true,
  })
  @Field(() => [Blog], { description: 'user blog', nullable: true })
  blog: Blog[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment], { description: 'user comment', nullable: true })
  comment: Comment[];
}
