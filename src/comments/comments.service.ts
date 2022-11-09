import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from 'src/comments/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  create(createCommentInput: CreateCommentInput): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentInput);
    return this.commentRepository.save(comment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: ['blog'],
    });
  }

  findOne(id: string): Promise<Comment> {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['blog'],
    });
  }

  update(id: string, updateCommentInput: UpdateCommentInput): Promise<Comment> {
    const comment: Comment = this.commentRepository.create(updateCommentInput);
    comment.id = id;
    return this.commentRepository.save(comment);
  }

  async remove(id: string): Promise<Comment> {
    const deleteComment = await this.commentRepository.findOne({
      where: { id },
      relations: ['blog'],
    });
    await this.commentRepository.remove(deleteComment);
    return deleteComment;
  }
}
