import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EarningsService } from './earnings.service';
import { Earning } from './entities/earning.entity';
import { CreateEarningInput } from './dto/create-earning.input';
import { UpdateEarningInput } from './dto/update-earning.input';
import { GqlAuthGuard } from 'src/user/gql-users.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/user/current-user';
@Resolver(() => Earning)
export class EarningsResolver {
  constructor(private readonly earningsService: EarningsService) {}

  @Mutation(() => Earning)
  createEarning(
    @Args('createEarningInput') createEarningInput: CreateEarningInput,
  ) {
    return this.earningsService.create(createEarningInput);
  }

  @Query(() => [Earning], { name: 'earnings' })
  findAll() {
    return this.earningsService.findAll();
  }

  @Query(() => Earning, { name: 'earning' })
  findOne(@Args('id') id: string) {
    return this.earningsService.findOne(id);
  }

  @Mutation(() => Earning)
  @UseGuards(GqlAuthGuard)
  updateEarning(
    @CurrentUser()
    user,
    @Args('updateEarningInput') updateEarningInput: UpdateEarningInput,
  ) {
    return this.earningsService.update(user, updateEarningInput);
  }

  @Mutation(() => Earning)
  removeEarning(@Args('id') id: string) {
    return this.earningsService.remove(id);
  }
}
