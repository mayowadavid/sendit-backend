import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { Message } from 'src/message/entities/message.entity';
import { Category } from 'src/categories/entities/category.entity';
<<<<<<< HEAD
import { allPackage } from '../../package/entities/package.entity';
=======
>>>>>>> origin/main

@ObjectType()
@Entity()
export class File {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'image', nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field({ description: 'url', nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field({ description: 'audio', nullable: true })
  @Column({ nullable: true })
  audio: string;

  @Field({ description: 'video', nullable: true })
  @Column({ nullable: true })
  video: string;

  @Field({ description: 'GIF', nullable: true })
  @Column({ nullable: true })
  gif: string;

  @Field({ description: 'documents', nullable: true })
  @Column({ nullable: true })
  document: string;

  @OneToOne(() => Profile, (profileImage) => profileImage.file)
  @Field(() => Profile, { description: 'profile image', nullable: true })
  profileImage: Profile;

  @ManyToOne(() => Blog, (blog) => blog.file)
  @Field(() => Blog, { description: 'Blog files', nullable: true })
  blog: Blog;

  @ManyToOne(() => Message, (message) => message.file)
  @Field(() => Message, { description: 'Chat files', nullable: true })
  message: Message;

<<<<<<< HEAD
  @ManyToOne(() => allPackage, (allPackage) => allPackage.images)
  @Field(() => allPackage, { description: 'package files', nullable: true })
  allPackage: allPackage;

=======
>>>>>>> origin/main
  @OneToOne(() => Category, (category) => category.file)
  @Field(() => Category, { description: 'category file', nullable: true })
  category: Category;
}
