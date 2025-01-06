import { CreateEarningInput } from './create-earning.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { EarningStatus } from '../entities/earning.entity';

@InputType()
export class UpdateEarningInput extends PartialType(CreateEarningInput) {
  @Field()
  id: string;

  @Field({ description: 'withdrawn', nullable: true })
  withdrawn: string;

  @Field({ description: 'status', nullable: true })
  status: EarningStatus;

  @Field({ description: 'overtime withdrawal', nullable: true })
  overtimeWithdrawn: string;

  @Field({ description: 'date', nullable: true })
  date: string;

  @Field({ description: 'pending Amount', nullable: true })
  pendingAmount: string;

  @Field({ description: 'monthly balance', nullable: true })
  balance: string;

  @Field({ description: 'overtime balance', nullable: true })
  overtimeEarnings: string;

  @Field({ description: 'overtime balance', nullable: true })
  userId: string;
}
