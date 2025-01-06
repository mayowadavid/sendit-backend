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
<<<<<<< HEAD
      relations: ['blog'],
=======
      relations: ['blog', 'child', 'child.child'],
>>>>>>> origin/main
    });
  }

  findOne(id: string): Promise<Comment> {
    return this.commentRepository.findOne({
      where: { id },
<<<<<<< HEAD
      relations: ['blog'],
    });
  }

=======
      relations: ['blog', 'child', 'child.child'],
    });
  }

  async findPostComments(blogId: string): Promise<Comment[]> {
    const comment = await this.commentRepository.find({
      where: { blogId },
      relations: ['child', 'child.child'],
    });

    if (!comment) {
      return [];
    }

    const commentWithChildren = await Promise.all(
      comment.map((child) => this.findAllCommentChildren(child)),
    );

    return commentWithChildren;
  }

  private async findAllCommentChildren(comment: Comment): Promise<Comment> {
    const child = await this.commentRepository.find({
      where: { parent: comment },
    });

    const nestedChild = await Promise.all(
      child.map((child) => this.findAllCommentChildren(child)),
    );
    return { ...comment, child: nestedChild };
  }

>>>>>>> origin/main
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
