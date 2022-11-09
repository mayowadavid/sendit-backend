import { Injectable } from '@nestjs/common';
import { CreateSecurityQuestionInput } from './dto/create-security-question.input';
import { UpdateSecurityQuestionInput } from './dto/update-security-question.input';

@Injectable()
export class SecurityQuestionService {
  create(createSecurityQuestionInput: CreateSecurityQuestionInput) {
    return 'This action adds a new securityQuestion';
  }

  findAll() {
    return `This action returns all securityQuestion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} securityQuestion`;
  }

  update(id: number, updateSecurityQuestionInput: UpdateSecurityQuestionInput) {
    return `This action updates a #${id} securityQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} securityQuestion`;
  }
}
