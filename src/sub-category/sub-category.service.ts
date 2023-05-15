import { Injectable } from '@nestjs/common';
import { CreateSubCategoryInput } from './dto/create-sub-category.input';
import { UpdateSubCategoryInput } from './dto/update-sub-category.input';
import { SubCategory } from './entities/sub-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {}

  async create(createSubCategoryInput: CreateSubCategoryInput) {
    const subCateg = await this.subCategoryRepository.create(
      createSubCategoryInput,
    );
    return this.subCategoryRepository.save(subCateg);
  }

  findAll(): Promise<SubCategory[]> {
    return this.subCategoryRepository.find({
      relations: ['category'],
    });
  }

  findOne(id: string) {
    return this.subCategoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async update(id: string, updateSubCategoryInput: UpdateSubCategoryInput) {
    const subCategory = await this.subCategoryRepository.findOne({
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
    const value = clean(updateSubCategoryInput);
    const result = { ...subCategory, ...value };
    return this.subCategoryRepository.save(result);
  }

  async remove(id: string) {
    const deleteSubCategory = await this.subCategoryRepository.findOne({
      where: { id },
    });
    return deleteSubCategory;
  }
}
