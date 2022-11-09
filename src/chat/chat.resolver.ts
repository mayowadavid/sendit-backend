import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { GqlAuthGuard } from 'src/user/gql-users.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/user/current-user';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => Chat, { name: 'createChat' })
  @UseGuards(GqlAuthGuard)
  createChat(
    @CurrentUser()
    user,
    @Args('createChat') createChatInput: CreateChatInput,
  ) {
    return this.chatService.create(user, createChatInput);
  }

  @Query(() => [Chat], { name: 'chats' })
  findAll() {
    return this.chatService.findAll();
  }

  @Query(() => [Chat], { name: 'chatsByUser' })
  @UseGuards(GqlAuthGuard)
  findChatByUser(@CurrentUser() user) {
    return this.chatService.findChatByUser(user);
  }

  @Query(() => Chat, { name: 'chat' })
  findOne(@Args('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Query(() => Chat, { name: 'findChatByExistence' })
  @UseGuards(GqlAuthGuard)
  findChatByExisyence(
    @CurrentUser()
    user,
    @Args('createChat') createChatInput: CreateChatInput,
  ) {
    return this.chatService.findChatByExistence(user, createChatInput);
  }

  @Mutation(() => Chat)
  @UseGuards(GqlAuthGuard)
  updateChat(
    @CurrentUser()
    user,
    @Args('updateChatInput') updateChatInput: UpdateChatInput,
  ) {
    return this.chatService.update(user, updateChatInput.id, updateChatInput);
  }

  @Mutation(() => Chat)
  removeChat(@Args('id') id: string) {
    return this.chatService.remove(id);
  }
}
