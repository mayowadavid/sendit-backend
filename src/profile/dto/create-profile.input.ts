import { InputType, Field } from '@nestjs/graphql';
import { UserLanguage } from '../entities/profile.entity';

@InputType()
export class CreateProfileInput {
  @Field({ description: 'first name', nullable: true })
  firstName: string;

  @Field({ description: 'last name', nullable: true })
  lastName: string;

  @Field({ description: 'All active orders', nullable: true })
  activeOrders: string;

  @Field({ description: 'All completed orders', nullable: true })
  completedOrder: number;

  @Field({ description: 'All canceled orders', nullable: true })
  canceledOrder: number;

  @Field({ description: 'User specialization', nullable: true })
  specialization: string;

  @Field({ description: 'about User', nullable: true })
  description: string;

  @Field({ description: 'description mark down', nullable: true })
  descriptionMarkDown: string;

  @Field({ description: 'file Id', nullable: true })
  fileId: string;

  @Field({ description: 'User achievement', nullable: true })
  achievement: string;

  @Field({ description: 'User rank', nullable: true })
  rank: string;

  @Field({ description: 'User language', nullable: true })
  language: UserLanguage;

  @Field({ description: 'User status', nullable: true })
  onlineStatus: boolean;

  @Field({ description: 'user registration date', nullable: true })
  createdAt: string;

  @Field({ description: 'user id', nullable: true })
  userId: string;
}
