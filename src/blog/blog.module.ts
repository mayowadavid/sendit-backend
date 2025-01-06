import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
// import { BlogController } from './blog.controller';
import { FilesService } from 'src/files/files.service';
import { File } from 'src/files/entities/file.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Blog, File])],
  providers: [BlogResolver, BlogService, FilesService],
  controllers: [],
})
export class BlogModule {}
