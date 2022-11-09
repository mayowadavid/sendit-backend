import { ObjectType, Field } from '@nestjs/graphql';
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
export class Referral {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'reffered count', nullable: true })
  @Column({ nullable: true, unique: true })
  refferedCount: string;

  @Field({ description: 'reffered User', nullable: true })
  @Column({ nullable: true, unique: true })
  refferedUser: string;
}
