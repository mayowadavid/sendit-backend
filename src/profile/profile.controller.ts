import {
  Controller,
  Post,
  Req,
  Res,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Express } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/gql-users.guard';
import { CurrentUser } from 'src/user/current-user';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('imageUpload')
  @UseInterceptors(FilesInterceptor('file'))
  @UseGuards(GqlAuthGuard)
  async addImage(
    @Req() request,
    @Res() response,
    @CurrentUser() user,
    @UploadedFiles() files: Express.Multer.File,
  ) {
    return await this.profileService.upload(files, request, user, response);
  }
}
