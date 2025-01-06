import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private fileService: FilesService,
  ) {}

  async create(CategoryInput: CreateCategoryInput): Promise<Category> {
    const categ = await this.categoryRepository.create(CategoryInput);
    return this.categoryRepository.save(categ);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['file', 'blog', 'subCategory'],
    });
  }

  findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['file', 'blog', 'subCategory'],
    });
  }

  async update(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({
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
    const value = clean(updateCategoryInput);
    const result = { ...category, ...value };
    return this.categoryRepository.save(result);
  }

  async upload(files, request, response): Promise<any[]> {
    let imageValue: any;
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
        .then((result) => (imageValue = result));
    }
    const { name, description, status, displayBanner } = request.body;
    const categoryContent = new Category();
    categoryContent.name = name;
    categoryContent.description = description;
    categoryContent.status = status;
    categoryContent.file = imageValue;
    categoryContent.displayBanner = displayBanner;
    const data = await this.categoryRepository.save(categoryContent);
    return response.status(200).json(data);
  }

  async remove(id: string): Promise<Category> {
    const deleteCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    return deleteCategory;
  }
}
