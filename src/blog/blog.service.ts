import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog, BlogType } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
    private fileService: FilesService,
  ) {}

  create(user, createBlogInput: CreateBlogInput): Promise<Blog> {
    const blog = this.blogRepository.create(createBlogInput);
    blog.user = user;
    return this.blogRepository.save(blog);
  }

  findAll(): Promise<Blog[]> {
    return this.blogRepository.find({
      relations: [
        'file',
        'category',
        'user',
        'comments',
        'comments.blog',
        'user.profile',
        'user.profile.file',
      ],
    });
  }

  async findByPost(offset: number, limit: number): Promise<[Blog[], number]> {
    const [posts, total] = await this.blogRepository.findAndCount({
      where: { type: BlogType.POST },
      relations: [
        'file',
        'category',
        'user',
        'user.profile',
        'user.profile.file',
        'comments',
        'comments.blog',
      ],
      skip: offset,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
    return [posts, total];
  }

  async findByPage(offset: number, limit: number): Promise<[Blog[], number]> {
    const [pages, total] = await this.blogRepository.findAndCount({
      where: { type: BlogType.PAGE },
      relations: [
        'file',
        'category',
        'user',
        'user.profile',
        'user.profile.file',
      ],
      skip: offset,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
    return [pages, total];
  }

  async findBlogByUser(user): Promise<Blog[]> {
    const result = await this.blogRepository.find({
      relations: [
        'file',
        'comments',
        'category',
        'user',
        'user.profile',
        'user.profile.file',
      ],
      where: {
        user,
      },
    });
    return result;
  }

  async findBlogBySlug(slug: string): Promise<Blog> {
    const result = await this.blogRepository.findOne({
      relations: [
        'file',
        'category',
        'user',
        'comments',
        'comments.blog',
        'comments.child',
      ],
      where: {
        slug,
      },
    });
    return result;
  }

  async upload(files, request, user, response): Promise<any[]> {
    let Images: any;
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
        .then((result) => (Images = result));
    }
    const { blogId } = request.body;
    const blog = await this.blogRepository.findOne(blogId);
    blog.file = Images;
    blog.user = user;
    const data = await this.blogRepository.save(blog);
    return response.status(200).json(data);
  }

  findOne(id: string) {
    return this.blogRepository.findOne({
      where: { id },
      relations: ['file', 'çomments'],
    });
  }

  async update(id: string, updateBlogInput: UpdateBlogInput): Promise<Blog> {
    const blog: Blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });
    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updateBlogInput);
    const result = { ...blog, ...value };
    return this.blogRepository.save(result);
  }

  async remove(id: string) {
    const deleteBlog = await this.blogRepository.findOne({
      where: { id },
    });
    const copy = { ...deleteBlog };
    deleteBlog.category = null;
    deleteBlog.user = null;
    deleteBlog.file = null;
    deleteBlog.comments = null;
    const result = await this.blogRepository.save(deleteBlog);
    await this.blogRepository.remove(deleteBlog);
    return copy;
  }
}
