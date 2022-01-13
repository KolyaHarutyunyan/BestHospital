import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EVENT_FOLDER } from './constants';
import { FileStorage } from './file.storage';
import * as sharp from 'sharp';
import { EditImageDTO, EventImageDTO } from './dto';
import { CreateImageDTO, FileDTO } from './dto';

import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { IFile } from './interface';
import { FileModel } from './file.model';
import { FileSanitizer } from './interceptor';

@Injectable()
export class FileService {
  constructor(
    private readonly storage: FileStorage,

    private readonly sanitizer: FileSanitizer,
  ) {
    this.model = FileModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IFile>;
  private mongooseUtil: MongooseUtil;

  saveImage = async (file): Promise<any> => {
    const url = await this.storage.storeImage(file, 'Polo');
    return { url: url, mimetype: file.mimetype, size: file.size, name: file.originalname };
  };

  create = async (dto: CreateImageDTO): Promise<FileDTO> => {
    const file = new this.model({
      type: dto.type,
      url: dto.url,
      mimetype: dto.mimetype,
      size: dto.size,
      name: dto.name,
      resource: dto.resource,
    });

    await file.save();
    return this.sanitizer.sanitize(file);
  };

  get = async (resource: string): Promise<FileDTO[]> => {
    const files = await this.model.find({ resource });
    this.checkFile(files[0]);
    return this.sanitizer.sanitizeMany(files);
  };

  edit = async (_id: string, dto: EditImageDTO): Promise<FileDTO> => {
    const file = await this.model.findById(_id);
    this.checkFile(file);
    if (dto.type) file.type = dto.type;
    if (dto.mimetype) file.mimetype = dto.mimetype;
    if (dto.size) file.size = dto.size;
    if (dto.name) file.name = dto.name;
    if (dto.url) file.url = dto.url;
    await file.save();
    return this.sanitizer.sanitize(file);
  };
  /** if the file is attached, it saves the file for the event and returns the image object */
  saveEventImage = async (file): Promise<EventImageDTO> => {
    if (!file) {
      return null;
    }
    const thumbnailBuffer = await sharp(file.buffer)
      .resize({ width: 200, height: 200, fit: 'cover' })
      .toBuffer();
    const thumbnailfile = {
      originalname: 'thumbnail_' + file.originalname,
      mimetype: file.mimetype,
      buffer: thumbnailBuffer,
    };
    const [imageUrl, thumbnailUrl] = await Promise.all([
      this.storage.storeImage(file, EVENT_FOLDER),
      this.storage.storeImage(thumbnailfile, EVENT_FOLDER),
    ]);
    return {
      imageUrl,
      thumbnailUrl,
    };
  };

  /** NOT USER: saves multiple images for the event */
  saveEventImages = async (files) => {
    try {
      const urls = await Promise.all(
        files.map((file: any) => this.storage.storeImage(file, EVENT_FOLDER)),
      );
      return urls;
    } catch (err) {
      throw err;
    }
  };

  deleteImages = async (_id: string) => {
    const file = await this.model.findById(_id);
    this.checkFile(file);
    const fileId = await Promise.all([this.storage.deleteImages([file.url]), file.remove()]);
    return fileId[1]._id;
  };

  /** Private Methods */
  private checkFile(file: IFile) {
    if (!file) {
      throw new HttpException('file with was not found', HttpStatus.NOT_FOUND);
    }
  }
}
