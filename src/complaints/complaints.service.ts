import { Injectable } from '@nestjs/common';
import { CreateComplaintInput } from './dto/create-complaint.input';
import { UpdateComplaintInput } from './dto/update-complaint.input';
import { Complaint } from './entities/complaint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private complaintRepository: Repository<Complaint>,
  ) {}

  create(createComplaintInput: CreateComplaintInput): Promise<Complaint> {
    const complaint = this.complaintRepository.create(createComplaintInput);
    return this.complaintRepository.save(complaint);
  }

  findAll(): Promise<Complaint[]> {
    return this.complaintRepository.find();
  }

  findOne(id: string): Promise<Complaint> {
    return this.complaintRepository.findOne({
      where: { id },
    });
  }

  update(
    id: string,
    updateComplaintInput: UpdateComplaintInput,
  ): Promise<Complaint> {
    const complaint: Complaint =
      this.complaintRepository.create(updateComplaintInput);
    complaint.id = id;
    return this.complaintRepository.save(complaint);
  }

  async remove(id: string): Promise<Complaint> {
    const deleteComplaint = await this.complaintRepository.findOne({
      where: { id },
    });
    await this.complaintRepository.remove(deleteComplaint);
    return deleteComplaint;
  }
}
