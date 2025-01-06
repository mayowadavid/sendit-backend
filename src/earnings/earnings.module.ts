import { Module } from '@nestjs/common';
import { EarningsService } from './earnings.service';
import { EarningsResolver } from './earnings.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Earning } from './entities/earning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Earning])],
  providers: [EarningsResolver, EarningsService],
  exports: [EarningsService],
})
export class EarningsModule {}
