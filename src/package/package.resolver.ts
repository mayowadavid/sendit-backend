import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PackageService } from './package.service';
<<<<<<< HEAD
import { allPackage } from './entities/package.entity';
=======
import { Package } from './entities/package.entity';
>>>>>>> origin/main
import { CreatePackageInput } from './dto/create-package.input';
import { UpdatePackageInput } from './dto/update-package.input';
import { GqlAuthGuard } from 'src/user/gql-users.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/user/current-user';

<<<<<<< HEAD
@Resolver(() => allPackage)
export class PackageResolver {
  constructor(private readonly Packageervice: PackageService) {}

  @Mutation(() => allPackage)
=======
@Resolver(() => Package)
export class PackageResolver {
  constructor(private readonly packageService: PackageService) {}

  @Mutation(() => Package)
>>>>>>> origin/main
  @UseGuards(GqlAuthGuard)
  createPackage(
    @CurrentUser()
    user,
    @Args('createPackageInput') createPackageInput: CreatePackageInput,
  ) {
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
      updatePackageInput.id,
      updatePackageInput,
    );
  }

<<<<<<< HEAD
  @Mutation(() => allPackage)
  removePackage(@Args('id') id: string) {
    return this.Packageervice.remove(id);
=======
  @Mutation(() => Package)
  removePackage(@Args('id') id: string) {
    return this.packageService.remove(id);
>>>>>>> origin/main
  }
}
