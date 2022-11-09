import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { GqlAuthGuard } from 'src/user/gql-users.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/user/current-user';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation(() => Blog)
  @UseGuards(GqlAuthGuard)
  createBlog(
    @CurrentUser()
    user,
    @Args('createBlogInput') createBlogInput: CreateBlogInput,
  ) {
    return this.blogService.create(user, createBlogInput);
  }

  @Query(() => [Blog], { name: 'blog' })
  findAll() {
    return this.blogService.findAll();
  }

  @Query(() => [Blog], { name: 'findBlogByUser' })
  @UseGuards(GqlAuthGuard)
  findBlogByUser(
    @CurrentUser()
    user,
  ) {
    return this.blogService.findBlogByUser(user);
  }

  @Query(() => Blog, { name: 'blog' })
  findOne(@Args('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Mutation(() => Blog)
  updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return this.blogService.update(updateBlogInput.id, updateBlogInput);
  }

  @Mutation(() => Blog)
  removeBlog(@Args('id') id: string) {
    return this.blogService.remove(id);
  }
}
