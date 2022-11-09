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
export class SecurityQuestion {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'question', nullable: true })
  @Column({ nullable: true })
  question: string;
}
