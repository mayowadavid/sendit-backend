import { Controller, Get, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly comments: CommentsService) {}

  @Get('fetchComments')
  async fetchComment(@Query('blogId') blogId: string) {
    return await this.comments.findPostComments(blogId);
  }
}
