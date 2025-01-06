import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
import { FilesService } from 'src/files/files.service';
import { PusherService } from 'src/pusher/pusher.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private fileService: FilesService,
    private pusherService: PusherService,
  ) {}

  async create(
    userDetail,
    createMessageInput: CreateMessageInput,
  ): Promise<Message> {
    const chatId = createMessageInput.chatId;
    const message = this.messageRepository.create(createMessageInput);
    message.user = userDetail;
    const result = await this.messageRepository.save(message);
    if (chatId !== undefined) {
      await this.pusherService.trigger(`${chatId}`, 'message', {
        id: result.id,
        time: result.time,
        date: result.date,
        description: result.description,
        file: [],
        user: {
          id: userDetail.id,
          userName: userDetail.userName,
        },
      });
      return result;
    } else {
      return result;
    }
    // this._server.emit('events', createMessageInput);
  }

  findAll(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['chat', 'file'],
    });
  }

  async upload(files, request, user, response): Promise<any[]> {
    const Images = [];
    for (let x = 0; x < files.length; x++) {
      const imageBuffer = files[x].buffer;
      const filename = files[x].originalname;
      let fileType: string;
      const imageType = [
        'image/jpeg',
        'image/png',
        'image/tiff',
        'image/svg+xml',
      ];
      const audioType = ['audio/mpeg'];
      const videoType = ['video/mpeg', 'video/mp4'];
      const documentType = [
        'application/msword',
        'application/gzip',
        'application/vnd.oasis.opendocument.text',
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.rar',
        'video/mp2t',
        'text/plain',
        'application/zip',
        '	application/x-7z-compressed',
      ];
      const gifType = ['image/gif'];
      if (imageType.includes(files[x].mimetype)) {
        fileType = 'image';
      } else if (audioType.includes(files[x].mimetype)) {
        fileType = 'audio';
      } else if (videoType.includes(files[x].mimetype)) {
        fileType = 'video';
      } else if (documentType.includes(files[x].mimetype)) {
        fileType = 'document';
      } else if (gifType.includes(files[x].mimetype)) {
        fileType = 'gif';
      } else {
        return response.status(200).json('invalid file type');
      }
      await this.fileService
        .uploadPublicFile(imageBuffer, filename, fileType)
        .then((result) => Images.push(result));
    }
    const { chatId, date, time, messageId, orderId } = request.body;
    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const messageFile = new Message();
    messageFile.id = messageId;
    messageFile.file = Images;
    messageFile.chatId = chatId;
    messageFile.orderId = orderId;
    messageFile.date = date;
    messageFile.time = time;
    messageFile.user = user;
    const value = clean(messageFile);
    const data = await this.messageRepository.save(value);
    return response.status(200).json(data);
  }

  findMessageByUser(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['chat', 'file'],
    });
  }

  async findOne(id: string) {
    return this.messageRepository.findOne({
      where: { id },
      relations: ['chat', 'file', 'user'],
    });
  }

  update(id: string, updateMessageInput: UpdateMessageInput): Promise<Message> {
    const message: Message = this.messageRepository.create(updateMessageInput);
    message.id = id;
    return this.messageRepository.save(message);
  }

  async remove(id: string): Promise<Message> {
    const deleteMessage = await this.messageRepository.findOne({
      where: { id },
      relations: ['headerId', 'subMessageId'],
    });
    await this.messageRepository.remove(deleteMessage);
    return deleteMessage;
  }
}
