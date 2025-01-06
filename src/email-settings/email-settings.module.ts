import { Module } from '@nestjs/common';
import { emailSettingsService } from './email-settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailSetting } from './entities/email-settings.entity';
import { emailSettingsController } from './email-settings-controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmailSetting])],
  controllers: [emailSettingsController],
  providers: [emailSettingsService],
  exports: [emailSettingsService],
})
export class EmailSettingsModule {}
