import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { emailSettingsService } from './email-settings.service';
import { CreateEmailInput } from './dto/create-email-input';
import { UpdateEmailInput } from './dto/update-email-input';

@Controller('email-settings')
export class emailSettingsController {
  constructor(private readonly emailSettingsService: emailSettingsService) {}

  @Post('create')
  create(@Body() CreateEmailInput: CreateEmailInput) {
    return this.emailSettingsService.create(CreateEmailInput);
  }

  @Post('sendMail')
  sendMail(@Body() CreateEmailInput: CreateEmailInput) {
    return this.emailSettingsService.sendMail(CreateEmailInput);
  }

  @Get('all')
  findAll() {
    return this.emailSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailSettingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateEmailInput: UpdateEmailInput) {
    return this.emailSettingsService.update(id, UpdateEmailInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailSettingsService.remove(id);
  }
}
