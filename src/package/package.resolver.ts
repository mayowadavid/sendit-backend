import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PackageService } from './package.service';
import { Package } from './entities/package.entity';
import { CreatePackageInput } from './dto/create-package.input';
import { UpdatePackageInput } from './dto/update-package.input';
import { GqlAuthGuard } from 'src/user/gql-users.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/user/current-user';

@Resolver(() => Package)
export class PackageResolver {
  constructor(private readonly packageService: PackageService) {}

  @Mutation(() => Package)
  @UseGuards(GqlAuthGuard)
  createPackage(
    @CurrentUser()
    user,
    @Args('createPackageInput') createPackageInput: CreatePackageInput,
  ) {
    return this.packageService.create(user, createPackageInput);
  }

  @Query(() => [Package], { name: 'package' })
  findAll() {
    return this.packageService.findAll();
  }

  @Query(() => Package, { name: 'package' })
  findOne(@Args('id') id: string) {
    return this.packageService.findOne(id);
  }

  @Query(() => Package, { name: 'currentUserpackage' })
  @UseGuards(GqlAuthGuard)
  currentUserPackage(@CurrentUser() user) {
    return this.packageService.currentUserPackage(user);
  }

  @Mutation(() => Package)
  updatePackage(
    @Args('updatePackageInput') updatePackageInput: UpdatePackageInput,
  ) {
    return this.packageService.update(
      updatePackageInput.id,
      updatePackageInput,
    );
  }

  @Mutation(() => Package)
  removePackage(@Args('id') id: string) {
    return this.packageService.remove(id);
  }
}
