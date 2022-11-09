import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SecurityQuestionService } from './security-question.service';
import { SecurityQuestion } from './entities/security-question.entity';
import { CreateSecurityQuestionInput } from './dto/create-security-question.input';
import { UpdateSecurityQuestionInput } from './dto/update-security-question.input';

@Resolver(() => SecurityQuestion)
export class SecurityQuestionResolver {
  constructor(
    private readonly securityQuestionService: SecurityQuestionService,
  ) {}

  @Mutation(() => SecurityQuestion)
  createSecurityQuestion(
    @Args('createSecurityQuestionInput')
    createSecurityQuestionInput: CreateSecurityQuestionInput,
  ) {
    return this.securityQuestionService.create(createSecurityQuestionInput);
  }

  @Query(() => [SecurityQuestion], { name: 'securityQuestion' })
  findAll() {
    return this.securityQuestionService.findAll();
  }

  @Query(() => SecurityQuestion, { name: 'securityQuestion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.securityQuestionService.findOne(id);
  }

  @Mutation(() => SecurityQuestion)
  updateSecurityQuestion(
    @Args('updateSecurityQuestionInput')
    updateSecurityQuestionInput: UpdateSecurityQuestionInput,
  ) {
    return this.securityQuestionService.update(
      updateSecurityQuestionInput.id,
      updateSecurityQuestionInput,
    );
  }

  @Mutation(() => SecurityQuestion)
  removeSecurityQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.securityQuestionService.remove(id);
  }
}
