import {
  Resolver,
  Query,
  Mutation,
  Args,
  ObjectType,
  Field,
} from '@nestjs/graphql';
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

  @Query(() => [Blog], { name: 'allBlog' })
  findAllBlog() {
    return this.blogService.findAll();
  }

  @Query(() => BlogPagePaginationResult, { name: 'allBlogPage' })
  async findAllBlogPage(
    @Args('pagination', { nullable: true }) createBlogInput: CreateBlogInput,
  ) {
    const { page, limit } = createBlogInput;
    const offset = (page - 1) * limit;
    const [pages, total] = await this.blogService.findByPage(offset, limit);
    const hasNextPage = offset + limit < total;
    return {
      pages,
      hasNextPage,
    };
  }

  @Query(() => BlogPostPaginationResult, { name: 'allBlogPost' })
  async findAllBlogPost(
    @Args('pagination', { nullable: true }) createBlogInput: CreateBlogInput,
  ) {
    const { page, limit } = createBlogInput;
    const offset = (page - 1) * limit;
    const [posts, total] = await this.blogService.findByPost(offset, limit);
    const hasNextPage = offset + limit < total;
    return {
      posts,
      hasNextPage,
    };
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

  @Query(() => Blog, { name: 'findBlogBySlug' })
  findBlogByName(@Args('name') slug: string) {
    return this.blogService.findBlogBySlug(slug);
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

@ObjectType()
export class BlogPostPaginationResult {
  @Field(() => [Blog])
  posts: Blog[];

  @Field(() => Boolean)
  hasNextPage: boolean;
}

@ObjectType()
export class BlogPagePaginationResult {
  @Field(() => [Blog])
  pages: Blog[];

  @Field(() => Boolean)
  hasNextPage: boolean;
}
