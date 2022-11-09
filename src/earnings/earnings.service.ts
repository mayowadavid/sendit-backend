import { Injectable } from '@nestjs/common';
import { CreateEarningInput } from './dto/create-earning.input';
import { UpdateEarningInput } from './dto/update-earning.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Earning } from './entities/earning.entity';

@Injectable()
export class EarningsService {
  constructor(
    @InjectRepository(Earning) private earningRepository: Repository<Earning>,
  ) {}

  create(createEarningInput: CreateEarningInput): Promise<Earning> {
    const earning = this.earningRepository.create(createEarningInput);
    return this.earningRepository.save(earning);
  }

  findAll(): Promise<Earning[]> {
    return this.earningRepository.find();
  }

  findOne(id: string): Promise<Earning> {
    return this.earningRepository.findOne({ where: { id } });
  }

  async update(user, updateEarningInput: UpdateEarningInput): Promise<Earning> {
    const wallet = await this.earningRepository.findOne({
      relations: ['user'],
      where: {
        user,
      },
    });
    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updateEarningInput);
    const result = { ...wallet, ...value };
    return this.earningRepository.save(result);
  }

  async remove(id: string): Promise<Earning> {
    const deleteEarning = await this.earningRepository.findOne({
      where: { id },
    });
    await this.earningRepository.remove(deleteEarning);
    return deleteEarning;
  }
}
