import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { ServiceModel } from './service.model';
import { IService } from './interface'
import { ServiceSanitizer } from './interceptor';
import { CreateServiceDto } from './dto/create.dto';
import { UpdateServiceDto } from './dto/edit.dto';
import { ServiceDTO } from './dto'
import { isValidObjectId } from '../util';

@Injectable()
export class ServiceService {

  constructor(
    private readonly sanitizer: ServiceSanitizer,
  ) {
    this.model = ServiceModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IService>;
  private mongooseUtil: MongooseUtil;

  /** Create a new service */
  async create(dto: CreateServiceDto): Promise<ServiceDTO> {
    try {
      let service = new this.model({
        name: dto.name,
        displayCode: dto.displayCode,
        category: dto.category
      });
      await service.save();
      return this.sanitizer.sanitize(service)
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Service already exists');
      throw e;
    }
  }

  /** returns all services */
  async findAll(): Promise<ServiceDTO[]> {
    try {
      const services = await this.model.find({});
      return this.sanitizer.sanitizeMany(services);
    } catch (e) {
      throw e;
    }
  }

  /** Get Service By Id */
  async findOne(_id: string) {
    try {
      isValidObjectId(_id)
      const service = await this.model.findOne({ _id });
      this.checkService(service);
      return this.sanitizer.sanitize(service);
    } catch (e) {
      throw e;
    }
  }

  /** Update the Service */
  async update(_id: string, dto: UpdateServiceDto): Promise<ServiceDTO> {
    try {
      const service = await this.model.findOne({ _id });
      this.checkService(service);
      if (dto.name) service.name = dto.name;
      if (dto.displayCode) service.displayCode = dto.displayCode;
      if (dto.category) service.category = dto.category;
      await service.save();
      return this.sanitizer.sanitize(service);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Service already exists');
      throw e;
    }
  }

  /** Delete the service */
  async remove(_id: string) {
    const service = await this.model.findByIdAndDelete({ _id });
    this.checkService(service);
    return service._id;
  }

  /** Private methods */
  /** if the service is not found, throws an exception */
  private checkService(service: IService) {
    if (!service) {
      throw new HttpException(
        'Service with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
