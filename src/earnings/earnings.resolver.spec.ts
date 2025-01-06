import { Test, TestingModule } from '@nestjs/testing';
import { EarningsResolver } from './earnings.resolver';
import { EarningsService } from './earnings.service';

describe('EarningsResolver', () => {
  let resolver: EarningsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EarningsResolver, EarningsService],
    }).compile();

    resolver = module.get<EarningsResolver>(EarningsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
