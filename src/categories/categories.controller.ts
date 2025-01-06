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
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post('imageUpload')
  @UseInterceptors(FilesInterceptor('file'))
  async addImage(
    @Req() request,
    @Res() response,
    @UploadedFiles() files: Express.Multer.File,
  ) {
    return await this.categoryService.upload(files, request, response);
  }
}
