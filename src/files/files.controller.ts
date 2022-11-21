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
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('imageUpload')
  @UseInterceptors(FilesInterceptor('file'))
  async addImage(
    @Req() request,
    @Res() response,
    @UploadedFiles() files: Express.Multer.File,
  ) {
    return await this.fileService.upload(files, request, response);
  }
}
