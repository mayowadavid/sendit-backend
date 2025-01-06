import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { File } from 'src/files/entities/file.entity';
import { EarningsModule } from 'src/earnings/earnings.module';
import { EarningsService } from 'src/earnings/earnings.service';
import { Earning } from 'src/earnings/entities/earning.entity';
import { FilesService } from 'src/files/files.service';
<<<<<<< HEAD
import { allPackage } from 'src/package/entities/package.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, File, Earning, allPackage]),
=======

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, File, Earning]),
>>>>>>> origin/main
    ProfileModule,
    EarningsModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '10d' },
    }),
  ],
  providers: [
    UserResolver,
    UserService,
    ProfileService,
    EarningsService,
    JwtStrategy,
    FilesService,
  ],
})
export class UserModule {}
