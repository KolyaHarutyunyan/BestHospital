import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AVATAR_FOLDER, EVENT_FOLDER, QR_FOLDER, RESTAURANT_FOLDER } from './constants';
import { FileStorage } from './file.storage';
import * as sharp from 'sharp';
import { EditImageDTO, EventImageDTO } from './dto';
import * as fs from "fs";
import { CreateImageDTO, FileDTO } from './dto';
// import { OfficeService } from '../office';
// import { BranchService } from '../branch';
// import { AgentService } from '../agent';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { IFile } from './interface';
import { FileModel } from './file.model';
import { FileSanitizer } from './interceptor';
// import { CustomerService } from '../customer';
// import { CarrierService } from '../carrier';
// import { LoadService } from '../load';

@Injectable()
export class FileService {
  constructor(
    private readonly storage: FileStorage,
    // private readonly office: OfficeService,
    // private readonly branch: BranchService,
    // private readonly agent: AgentService,
    // private readonly customer: CustomerService,
    // private readonly load: LoadService,
    // private readonly carrier: CarrierService,

    private readonly sanitizer: FileSanitizer,

  ) {
    this.model = FileModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IFile>;
  private mongooseUtil: MongooseUtil;

  saveImage = async (file): Promise<string> => {
    return await this.storage.storeImage(file, 'Polo');
  }

  create = async (dto: CreateImageDTO): Promise<FileDTO> => {
    const onMod = dto.onModel;
    const resource = await this[onMod].getRaw(dto.resource);
    const file = new this.model({
      type: dto.type,
      url: dto.url,
      resource: dto.resource,
      onModel: dto.onModel
    })

    await file.save()
    return this.sanitizer.sanitize(file)
  }

  get = async (resource: string, onModel: string): Promise<FileDTO[]> => {
    const files = await this.model.find({ resource, onModel });
    this.checkFile(files[0])
    return this.sanitizer.sanitizeMany(files)
  }

  edit = async (_id: string, dto: EditImageDTO): Promise<FileDTO> => {
    const file = await this.model.findById(_id);
    this.checkFile(file);
    if (dto.type) file.type = dto.type;
    if (dto.url) file.url = dto.url;
    await file.save()
    return this.sanitizer.sanitize(file)
  }
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
    const file = await this.model.findById(_id)
    this.checkFile(file)
    const fileId = await Promise.all([
      this.storage.deleteImages([file.url]),
      file.remove()
    ])
    return fileId[1]._id
  };

  /** Private Methods */
  private checkFile(file: IFile) {
    if (!file) {
      throw new HttpException('file with was not found', HttpStatus.NOT_FOUND);
    }
  }
}
