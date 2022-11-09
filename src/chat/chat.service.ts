import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}
  create(user, createChatInput: CreateChatInput): Promise<Chat> {
    const chat = this.chatRepository.create(createChatInput);
    chat.sender = user;
    chat.senderId = user.id;
    return this.chatRepository.save(chat);
  }

  findAll(): Promise<Chat[]> {
    return this.chatRepository.find({
      relations: ['message', 'receiver', 'sender'],
    });
  }

  findOne(id: string) {
    return this.chatRepository.findOne({
      where: { id },
      relations: ['message', 'receiver', 'sender'],
    });
  }

  async findChatByUser(user): Promise<Chat[]> {
    const chatSent = await this.chatRepository.find({
      relations: [
        'message',
        'message.user',
        'message.user.profile',
        'message.user.profile.file',
        'message.file',
        'receiver',
        'receiver.profile',
        'receiver.profile.file',
        'sender',
        'sender.profile',
        'sender.profile.file',
      ],
      where: {
        senderId: user.id,
      },
    });

    const chatReceived = await this.chatRepository.find({
      relations: [
        'message',
        'message.user',
        'message.user.profile',
        'message.user.profile.file',
        'receiver',
        'receiver.profile',
        'receiver.profile.file',
        'sender',
        'sender.profile',
        'sender.profile.file',
      ],
      where: {
        receiverId: user.id,
      },
    });

    return chatSent.concat(chatReceived);
  }

  async findChatByExistence(
    user,
    createChatInput: CreateChatInput,
  ): Promise<Chat> {
    const result = await this.chatRepository.findOne({
      relations: ['message', 'receiver', 'sender'],
      where: {
        receiverId: createChatInput.receiverId,
        senderId: user.id,
      },
    });
    if (result == undefined) {
      throw new BadRequestException('you have not yet interacted');
    } else {
      return result;
    }
  }

  update(user, id: string, updateChatInput: UpdateChatInput): Promise<Chat> {
    const chat: Chat = this.chatRepository.create(updateChatInput);
    chat.id = id;
    return this.chatRepository.save(chat);
  }

  async remove(id: string): Promise<Chat> {
    const deleteChat = await this.chatRepository.findOne({
      where: { id },
      relations: ['message', 'receiver', 'sender'],
    });
    await this.chatRepository.remove(deleteChat);
    return deleteChat;
  }
}
