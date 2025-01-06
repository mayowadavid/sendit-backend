import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { GqlAuthGuard } from 'src/user/gql-users.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/user/current-user';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ) {
    return this.profileService.create(createProfileInput);
  }

  @Query(() => [Profile], { name: 'findAllProfile' })
  findAll() {
    return this.profileService.findAll();
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id') id: string) {
    return this.profileService.findProfile(id);
  }

  @Query(() => Profile, { name: 'findProfileName' })
  findProfileName(@Args('userName') userName: string) {
    return this.profileService.findProfileName(userName);
  }

  @Query(() => Profile, { name: 'findUserProfile' })
  @UseGuards(GqlAuthGuard)
  findUserProfile(
    @CurrentUser()
    user,
  ) {
    return this.profileService.findUserProfile(user);
  }

  @Mutation(() => Profile)
  @UseGuards(GqlAuthGuard)
  updateProfile(
    @CurrentUser()
    user,
    @Args('updateProfileInput')
    updateProfileInput: UpdateProfileInput,
  ) {
    return this.profileService.update(user, updateProfileInput);
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id') id: string) {
    return this.profileService.remove(id);
  }
}
