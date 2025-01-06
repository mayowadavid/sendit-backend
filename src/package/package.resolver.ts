import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PackageService } from './package.service';
import { allPackage } from './entities/package.entity';
import { CreatePackageInput } from './dto/create-package.input';
import { UpdatePackageInput } from './dto/update-package.input';
import { GqlAuthGuard } from 'src/user/gql-users.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/user/current-user';

@Resolver(() => allPackage)
export class PackageResolver {
  constructor(private readonly Packageervice: PackageService) {}

  @Mutation(() => allPackage)
  @UseGuards(GqlAuthGuard)
  createPackage(
    @CurrentUser()
    user,
    @Args('createPackageInput') createPackageInput: CreatePackageInput,
  ) {
    return this.Packageervice.create(user, createPackageInput);
  }

  @Query(() => [allPackage], { name: 'package' })
  findAll() {
    return this.Packageervice.findAll();
  }

  @Query(() => allPackage, { name: 'package' })
  findOne(@Args('id') id: string) {
    return this.Packageervice.findOne(id);
  }

  @Query(() => allPackage, { name: 'currentUserpackage' })
  @UseGuards(GqlAuthGuard)
  currentUserPackage(@CurrentUser() user) {
    return this.Packageervice.currentUserPackage(user);
  }

  @Mutation(() => allPackage)
  updatePackage(
    @Args('updatePackageInput') updatePackageInput: UpdatePackageInput,
  ) {
    return this.Packageervice.update(updatePackageInput.id, updatePackageInput);
  }

  @Mutation(() => allPackage)
  deleteImage(
    @Args('updatePackageInput') updatePackageInput: UpdatePackageInput,
  ) {
    return this.Packageervice.deleteImage(
      updatePackageInput.id,
      updatePackageInput,
    );
  }

  @Mutation(() => allPackage)
  removePackage(@Args('id') id: string) {
    return this.Packageervice.remove(id);
  }
}
