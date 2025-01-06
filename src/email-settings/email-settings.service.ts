import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateEmailInput } from './dto/create-email-input';
import { UpdateEmailInput } from './dto/update-email-input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { EmailSetting } from './entities/email-settings.entity';
import { template } from 'nestjs-mailer';
import * as fs from 'fs';
@Injectable()
export class emailSettingsService {
  constructor(
    @InjectRepository(EmailSetting)
    private AdminSettingsRepository: Repository<EmailSetting>,
  ) {}
  async sendMail(createEmailSettingDto: CreateEmailInput) {
    const { subject, receiver } = createEmailSettingDto;
    const data = {
      receiver,
      subject,
    };
    const res = Object.entries(data).find(
      (d) => d[1] == '' || d[1] == null || d[1] == undefined,
    );
    if (res) throw new BadRequestException(`${res[0]} can't be undefined`);
    const transporter = nodemailer.createTransport({
      port: 587,
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailData = {
      from: process.env.MAIL_EMAIL,
      to: receiver,
      subject,
      html: template('src/template/new-email.hbs', { name: 'john' }),
    };

    await transporter.sendMail(mailData, function (err, info) {
      const message = 'Your email successfully sent!';
      if (err) {
        throw new BadRequestException(err);
      } else {
        return message + info;
      }
    });
  }

  async create(createEmailSettingDto: CreateEmailInput) {
    const res = Object.entries(createEmailSettingDto).find(
      (d) => d[1] == '' || d[1] == null || d[1] == undefined,
    );
    if (res) throw new BadRequestException(`${res[0]} can't be undefined`);
    const adminSettings = await this.AdminSettingsRepository.create(
      createEmailSettingDto,
    );
    return this.AdminSettingsRepository.save(adminSettings);
  }

  findAll(): Promise<EmailSetting[]> {
    return this.AdminSettingsRepository.find({});
  }

  findOne(id: string) {
    return this.AdminSettingsRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    updateEmailSettingDto: UpdateEmailInput,
  ): Promise<EmailSetting> {
    const EmailSetting: EmailSetting =
      await this.AdminSettingsRepository.findOne({
        where: {
          id,
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
    const value = clean(updateEmailSettingDto);
    const result = { ...EmailSetting, ...value };
    return this.AdminSettingsRepository.save(result);
  }

  async remove(id: string) {
    const deleteEmailSetting = await this.AdminSettingsRepository.findOne({
      where: { id },
    });
    const copy = { ...deleteEmailSetting };
    const result = await this.AdminSettingsRepository.save(copy);
    await this.AdminSettingsRepository.remove(result);
    return copy;
  }
}
