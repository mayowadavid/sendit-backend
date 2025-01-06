import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubCategoryService } from './sub-category.service';
import { SubCategory } from './entities/sub-category.entity';
import { CreateSubCategoryInput } from './dto/create-sub-category.input';
import { UpdateSubCategoryInput } from './dto/update-sub-category.input';

@Resolver(() => SubCategory)
export class SubCategoryResolver {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Mutation(() => SubCategory)
  createSubCategory(
    @Args('createSubCategoryInput')
    createSubCategoryInput: CreateSubCategoryInput,
  ) {
    return this.subCategoryService.create(createSubCategoryInput);
  }

  @Query(() => [SubCategory], { name: 'allSubCategory' })
  findAll() {
    return this.subCategoryService.findAll();
  }

  @Query(() => SubCategory, { name: 'subCategory' })
  findOne(@Args('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  @Mutation(() => SubCategory)
  updateSubCategory(
    @Args('updateSubCategoryInput')
    updateSubCategoryInput: UpdateSubCategoryInput,
  ) {
    return this.subCategoryService.update(
      updateSubCategoryInput.id,
      updateSubCategoryInput,
    );
  }

  @Mutation(() => SubCategory)
  removeSubCategory(@Args('id') id: string) {
    return this.subCategoryService.remove(id);
  }
}
