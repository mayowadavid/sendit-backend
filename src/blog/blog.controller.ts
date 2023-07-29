import { Controller, Get, Req } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('blogByName')
  async fetchBlogByName(@Req() request) {
    const { name } = request.body;
    //return await this.blogService.findBlogByName(name);
  }
}
