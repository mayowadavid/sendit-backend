import { InputType, Field } from '@nestjs/graphql';
import { UserLanguage, UserRole } from '../entities/profile.entity';

@InputType()
export class CreateProfileInput {
  @Field({ description: 'client gender', nullable: true })
  gender: string;

  @Field({ description: 'phone number', nullable: true })
  phoneNumber: string;

  @Field({ description: 'profile image', nullable: true })
  profileImage: string;

  @Field({ description: 'client firstname', nullable: true })
  firstName: string;

  @Field({ description: 'client lastname', nullable: true })
  lastName: string;

  @Field({ description: 'user id', nullable: true })
  userId: string;

  @Field({ description: 'User status', nullable: true })
  onlineStatus: boolean;

  @Field({ description: 'User role', nullable: true })
  role: UserRole;

  @Field({ description: 'User language', nullable: true })
  language: UserLanguage;
}
