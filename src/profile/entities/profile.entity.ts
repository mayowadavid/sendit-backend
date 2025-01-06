import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { File } from 'src/files/entities/file.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  VARTISAN = 'vartisan',
  CLIENT = 'client',
}

export enum UserLanguage {
  ENGLISH = 'english',
  FRENCH = 'french',
  SPANISH = 'spanish',
}

@ObjectType()
@Entity()
export class Profile {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'client gender', nullable: true })
  @Column({ nullable: true })
  gender: string;

  @Field({ description: 'phone number', nullable: true })
  @Column({ nullable: true })
  phoneNumber: string;

  @Field({ description: 'profile image', nullable: true })
  @Column({ nullable: true })
  profileImage: string;

  @Field({ description: 'client firstname', nullable: true })
  @Column({ nullable: true, unique: true })
  firstName: string;

  @Field({ description: 'client lastname', nullable: true })
  @Column({ nullable: true, unique: true })
  lastName: string;

  @Field({ description: 'user id', nullable: true })
  @Column({ nullable: true })
  userId: string;

  @Field({ description: 'User status', nullable: true })
  @Column({ nullable: true })
  onlineStatus: boolean;

  @Field({ description: 'User role', nullable: true })
  @Column({ nullable: true, type: 'enum', enum: UserRole, default: 'client' })
  role: UserRole;

  @Field({ description: 'User language', nullable: true })
  @Column({
    nullable: true,
    type: 'enum',
    enum: UserLanguage,
    default: 'english',
  })
  language: UserLanguage;

  @OneToOne(() => User, (user) => user.profile)
  @Field(() => User, { description: 'user earning' })
  user: User;

  @OneToOne(() => File, (file) => file.profileImage)
  @JoinColumn()
  @Field(() => File, { description: 'profile images', nullable: true })
  file: File;
}
