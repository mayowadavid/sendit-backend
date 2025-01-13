import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UserStatus } from '../entities/user.entity';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;

  @Field({ description: 'client username', nullable: true })
  userName: string;

  @Field({ description: 'client email', nullable: true })
  email: string;

  @Field({ description: 'client password', nullable: true })
  password: string;

  @Field({ description: 'client password', nullable: true })
  newPassword: string;

  @Field({ description: 'profile Id', nullable: true })
  profileId: string;

  @Field({ description: 'order Id', nullable: true })
  orderId: string;

  @Field({ description: 'chat Id', nullable: true })
  chatId: string;

  @Field({ description: 'earning Id', nullable: true })
  earningId: string;

  @Field({ description: 'refresh token', nullable: true })
  refreshToken: string;

  @Field({ description: 'refresh token exp', nullable: true })
  refreshTokenExp: string;

  @Field({ description: 'registration date', nullable: true })
  createdAt: string;

  @Field({ description: 'user status', nullable: true })
  status: UserStatus;
}
