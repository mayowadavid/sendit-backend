import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { FilesService } from 'src/files/files.service';
import { File } from 'src/files/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, File])],
  providers: [ProfileResolver, ProfileService, FilesService],
  exports: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
