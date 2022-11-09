import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Notification {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'notification name)', nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field({ description: 'notification description)', nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ description: 'notification date)', nullable: true })
  @Column({ nullable: true })
  createdAt: string;

  @Field({ description: 'notification date)', nullable: true })
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.notification)
  @Field(() => User, { description: 'user notification', nullable: true })
  user;
}
