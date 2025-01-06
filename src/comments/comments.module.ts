import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
<<<<<<< HEAD
=======
import { CommentsController } from './comments.controller';
>>>>>>> origin/main

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsResolver, CommentsService],
<<<<<<< HEAD
=======
  controllers: [CommentsController],
>>>>>>> origin/main
})
export class CommentsModule {}
