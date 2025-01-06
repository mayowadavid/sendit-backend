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
import { PackageService } from './package.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/gql-users.guard';
import { CurrentUser } from 'src/user/current-user';

@Controller('package')
export class PackageController {
  constructor(private readonly PackageService: PackageService) {}

  @Post('imageUpload')
  @UseInterceptors(FilesInterceptor('file'))
  async addImage(
    @Req() request,
    @Res() response,
    @CurrentUser() user,
    @UploadedFiles() files: Express.Multer.File,
  ) {
    return await this.PackageService.upload(files, request, response);
  }
}