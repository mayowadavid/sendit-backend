import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageResolver } from './package.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allPackage } from './entities/package.entity';
import { File } from 'src/files/entities/file.entity';
import { FilesService } from 'src/files/files.service';
import { PackageController } from './package.controller';

@Module({
  imports: [TypeOrmModule.forFeature([allPackage, File])],
  providers: [PackageResolver, PackageService, FilesService],
  exports: [PackageService],
})

export class PackageModule {}
