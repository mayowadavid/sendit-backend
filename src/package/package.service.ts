import { Injectable } from '@nestjs/common';
import { CreatePackageInput } from './dto/create-package.input';
import { UpdatePackageInput } from './dto/update-package.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { allPackage } from './entities/package.entity';
import { FilesService } from 'src/files/files.service';
import { packageStatus } from './entities/package.entity';
@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(allPackage)
    private packageRepository: Repository<allPackage>,
    private fileService: FilesService,
  ) {}

  create(user, CreatePackageInput: CreatePackageInput): Promise<allPackage> {
    const packages = this.packageRepository.create(CreatePackageInput);
    packages.user = user;
    return this.packageRepository.save(packages);
  }

  findAll(): Promise<allPackage[]> {
    return this.packageRepository.find({
      relations: ['user', 'images '],
    });
  }

  async findPackageByUser(user): Promise<allPackage[]> {
    const result = await this.packageRepository.find({
      relations: ['user', 'images'],
      where: {
        user,
      },
    });
    return result;
  }

  async currentUserPackage(user): Promise<allPackage> {
    const result = await this.packageRepository.findOne({
      relations: ['user', 'images'],
      where: {
        user,
        status: packageStatus.INCOMPLETE,
      },
    });
    return result;
  }

  async upload(files, request, response): Promise<any[]> {
    let Images = [];
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
        .then((result) => Images.push(result));
    }
    const { id } = request.body;
    const packageData = await this.packageRepository.findOne({
      relations: ['user', 'images'],
      where: { id },
    });

    packageData.images = [...packageData?.images, ...Images];
    const data = await this.packageRepository.save(packageData);
    return response.status(200).json(data);
  }

  findOne(id: string) {
    return this.packageRepository.findOne({
      where: { id },
      relations: ['user', 'images'],
    });
  }

  async update(
    id: string,
    updatePackageInput: UpdatePackageInput,
  ): Promise<allPackage> {
    const packages: allPackage = await this.packageRepository.findOne({
      where: { id },
      relations: ['user', 'images'],
    });

    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updatePackageInput);
    const result = { ...packages, ...value };
    return this.packageRepository.save(result);
  }

  async deleteImage(
    id: string,
    updatePackageInput: UpdatePackageInput,
  ): Promise<allPackage> {
    const packages: allPackage = await this.packageRepository.findOne({
      where: { id },
      relations: ['user', 'images'],
    });

    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updatePackageInput);
    const allImage = packages?.images.filter(
      ({ id }) => id != updatePackageInput?.imagesId,
    );
    const result = { ...packages, ...value, images: allImage };
    this.fileService.remove(updatePackageInput?.imagesId);
    return this.packageRepository.save(result);
  }

  async remove(id: string) {
    const deleteBlog = await this.packageRepository.findOne({
      where: { id },
    });
    const copy = { ...deleteBlog };
    deleteBlog.user = null;
    deleteBlog.images = null;
    const result = await this.packageRepository.save(deleteBlog);
    await this.packageRepository.remove(deleteBlog);
    return copy;
  }
}
