import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { ServiceModel } from './service.model';
import { IService } from './interface'
import { ServiceSanitizer } from './interceptor';
import { CreateServiceDto } from './dto/create.dto';
import { UpdateServiceDto } from './dto/edit.dto';
import { ServiceDTO } from './dto'

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
  async create(dto: CreateServiceDto, funderId: string): Promise<ServiceDTO> {
    try {
      let service = new this.model({
        funderId,
        name: dto.name,
        rate: dto.rate,
        cptCode: dto.cptCode,
        size: dto.size,
        min: dto.min,
        max: dto.max,
        modifier: dto.modifier,
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
  async findAll(funderId: string):Promise<ServiceDTO[]> {
    try {
      const services = await this.model.find({ funderId });
      return this.sanitizer.sanitizeMany(services);
    } catch (e) {
      throw e;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  /** Update the funder */
  async update(_id: string, dto: UpdateServiceDto): Promise<ServiceDTO> {
    try {
      const service = await this.model.findOne({ _id });
      this.checkService(service);
      if (dto.name) service.name = dto.name;
      if (dto.rate) service.rate = dto.rate;
      if (dto.cptCode) service.cptCode = dto.cptCode;
      if (dto.size) service.size = dto.size;
      if (dto.min) service.min = dto.min;
      if (dto.max) service.max = dto.max;
      if (dto.modifier) service.modifier = dto.modifier;
      if (dto.displayCode) service.displayCode = dto.displayCode;
      if (dto.category) service.category = dto.category;
      await service.save();
      return this.sanitizer.sanitize(service);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Service already exists');
      throw e;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
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
