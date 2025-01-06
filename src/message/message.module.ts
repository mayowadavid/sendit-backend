import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/message/entities/message.entity';
import { MessageController } from './message.controller';
import { FilesService } from 'src/files/files.service';
import { File } from 'src/files/entities/file.entity';
import { PusherService } from 'src/pusher/pusher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, File])],
  providers: [MessageResolver, MessageService, FilesService, PusherService],
  controllers: [MessageController],
})
export class MessageModule {}
