import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesController } from './categories.controller';
import { File } from 'src/files/entities/file.entity';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, File])],
  providers: [CategoriesResolver, CategoriesService, FilesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
