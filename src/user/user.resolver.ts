import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from './gql-users.guard';
import { CurrentUser } from './current-user';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUser') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'getAllUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'findUser' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Query(() => User, { name: 'loginUser' })
  loginUser(@Args('userData') createUserInput: CreateUserInput) {
    return this.userService.loginUser(createUserInput);
  }

  @Query(() => User, { name: 'currentUser' })
  @UseGuards(GqlAuthGuard)
  currentUser(@CurrentUser() user) {
    return this.userService.currentUser(user);
  }

  @Query(() => User, { name: 'findUserByName' })
  findUserByName(@Args('userName') userName: string) {
    return this.userService.findUserByName(userName);
  }

  @Mutation(() => User, { name: 'updateUser' })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User, { name: 'removeUser' })
  removeUser(@Args('id') updateUserInput: UpdateUserInput) {
    return this.userService.remove(updateUserInput.id);
  }
}
