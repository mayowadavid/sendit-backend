import {
  Controller,
  Post,
  Req,
  Res,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { Express } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MessageService } from './message.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/gql-users.guard';
import { CurrentUser } from 'src/user/current-user';
import { PusherService } from 'src/pusher/pusher.service';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private pusherService: PusherService,
  ) {}

  @Post('imageUpload')
  @UseInterceptors(FilesInterceptor('file'))
  @UseGuards(GqlAuthGuard)
  async addImage(
    @Req() request,
    @Res() response,
    @CurrentUser() user,
    @UploadedFiles() files: Express.Multer.File,
  ) {
    return await this.messageService.upload(files, request, user, response);
  }

  @Post('message')
  async messages(
    @Body('username') username: string,
    @Body('message') message: string,
  ) {
    await this.pusherService.trigger('chat', 'message', {
      username,
      message,
    });

    return [];
  }
}
