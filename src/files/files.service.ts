import { Injectable } from '@nestjs/common';
import { UpdateFileInput } from './dto/update-file.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private configService: ConfigService,
  ) {}

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
    fileType: string,
  ) {
    const s3 = new S3({
      region: 'us-east-1',
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_KEY,
      correctClockSkew: true,
    });
    const bufferRep = dataBuffer;
    const uploadResult = await s3
      .upload({
        Bucket: 'bran-bucket',
        Body: bufferRep,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
    const name = uploadResult.Key;
    const location = uploadResult.Location;
    const data = {
      name,
      [fileType]: location,
    };

    const newFile = this.fileRepository.create(data);
    await this.fileRepository.save(newFile);
    return newFile;
  }

  create(data): Promise<any> {
    const file = this.fileRepository.create(data);
    return this.fileRepository.save(file);
  }

  async upload(files, request, response): Promise<any[]> {
    const Images = [];
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
      await this.uploadPublicFile(imageBuffer, filename, fileType).then(
        (result) => Images.push(result),
      );
    }
    return response.status(200).json(Images);
  }

  findAll(): Promise<File[]> {
    return this.fileRepository.find({
      relations: ['message'],
    });
  }

  findOne(id: string): Promise<File> {
    return this.fileRepository.findOne({ where: { id } });
  }

  update(id: string, updateFileInput: UpdateFileInput): Promise<File> {
    const file: File = this.fileRepository.create(updateFileInput);
    file.id = id;
    return this.fileRepository.save(file);
  }

  async remove(id: string): Promise<File> {
    const deleteFile = await this.fileRepository.findOne({
      where: { id },
      relations: ['profileImage', 'message', 'blog'],
    });
    await this.fileRepository.remove(deleteFile);
    return deleteFile;
  }
}
