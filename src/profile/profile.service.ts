import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private fileService: FilesService,
  ) {}

  create(createProfileInput: CreateProfileInput): Promise<Profile> {
    const profile = this.profileRepository.create(createProfileInput);
    return this.profileRepository.save(profile);
  }

  findUserProfile(user): Promise<Profile> {
    return this.profileRepository.findOne({
      relations: ['file', 'user'],
      where: {
        user,
      },
    });
  }

  findAll(): Promise<Profile[]> {
    return this.profileRepository.find({
      relations: ['file', 'user'],
    });
  }

  async upload(files, request, user, response): Promise<any[]> {
    let Images: any;
    for (let x = 0; x < files.length; x++) {
      const imageBuffer = files[x].buffer;
      const filename = files[x].originalname;
      let fileType: string;
      const imageType = [
        'image/jpeg',
        'image/png',
        'image/tiff',
        'image/svg+xml',
      ];
      const audioType = ['audio/mpeg'];
      const videoType = ['video/mpeg', 'video/mp4'];
      const documentType = [
        'application/msword',
        'application/gzip',
        'application/vnd.oasis.opendocument.text',
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.rar',
        'video/mp2t',
        'text/plain',
        'application/zip',
        '	application/x-7z-compressed',
      ];
      const gifType = ['image/gif'];
      if (imageType.includes(files[x].mimetype)) {
        fileType = 'image';
      } else if (audioType.includes(files[x].mimetype)) {
        fileType = 'audio';
      } else if (videoType.includes(files[x].mimetype)) {
        fileType = 'video';
      } else if (documentType.includes(files[x].mimetype)) {
        fileType = 'document';
      } else if (gifType.includes(files[x].mimetype)) {
        fileType = 'gif';
      } else {
        return response.status(200).json('invalid file type');
      }
      await this.fileService
        .uploadPublicFile(imageBuffer, filename, fileType)
        .then((result) => (Images = result));
    }
    const { profileId } = request.body;
    const profile = await this.profileRepository.findOne({
      relations: ['file', 'user'],
      where: { id: profileId },
    });
    profile.file = Images;
    profile.user = user;
    console.log(profile);
    const data = await this.profileRepository.save(profile);
    return response.status(200).json(data);
  }

  findProfileName(userName): Promise<Profile> {
    return this.profileRepository.findOne({
      relations: ['user'],
      where: {
        user: { userName },
      },
    });
  }

  findProfile(id: string): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { id },
      relations: ['file', 'user'],
    });
  }

  async update(user, updateProfileInput: UpdateProfileInput): Promise<any> {
    const id = updateProfileInput.id;
    const profile = await this.profileRepository.findOne({
      where: { id },
    });
    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updateProfileInput);
    const result = { ...profile, ...value };
    result.user = user;
    return this.profileRepository.save(result);
  }

  async remove(id: string): Promise<Profile> {
    const deleteProfile = await this.profileRepository.findOne({
      where: { id },
      relations: ['file', 'user'],
    });
    await this.profileRepository.remove(deleteProfile);
    return deleteProfile;
  }
}
