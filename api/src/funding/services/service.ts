import { Injectable } from '@nestjs/common';
import { serviceLog } from 'src/history/history.constants';
import { CreateServiceDTO, UpdateServiceDto, ServiceDTO } from '../dto';
import { BaseService } from './base.service';

@Injectable()
export class FundingService extends BaseService {
  /** Create a new service */
  async createService(dto: CreateServiceDTO, _id: string, userId: string): Promise<ServiceDTO> {
    try {
      const funder = await this.model.findById({ _id });
      this.checkFunder(funder);
      const globService = await this.service.findOne(dto.serviceId);
      const service = new this.serviceModel({
        funderId: _id,
        serviceId: globService.id,
        name: dto.name,
        rate: dto.rate,
        cptCode: dto.cptCode,
        size: dto.size,
        min: dto.min,
        max: dto.max,
      });
      await Promise.all([
        service.save(),
        this.historyService.create({
          resource: _id,
          onModel: 'Funder',
          title: serviceLog.createServiceTitle,
          user: userId,
        }),
      ]);
      // return this.sanitizer.sanitize(service)
      return service;
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Service already exists');
      throw e;
    }
  }
  /** returns all services */
  async findAllServices(_id: string): Promise<ServiceDTO[]> {
    try {
      const funder = await this.model.findById({ _id });
      this.checkFunder(funder);
      const services = await this.serviceModel.find({ funderId: _id });
      // return this.sanitizer.sanitizeMany(services);
      return services;
    } catch (e) {
      throw e;
    }
  }
  /** returns service by id */
  async findService(_id: string): Promise<any> {
    try {
      const service = await this.serviceModel.findById({ _id });
      this.checkFundingService(service);
      return service;
    } catch (e) {
      throw e;
    }
  }
  /** returns all services for client*/
  async findAllServiceForClient(_id: string, fundingServiceId: string): Promise<ServiceDTO[]> {
    try {
      const funder = await this.model.findOne({ _id });
      this.checkFunder(funder);
      const services = await this.serviceModel
        .find({ funderId: _id, _id: fundingServiceId })
        .populate('modifiers');
      // return this.sanitizer.sanitizeMany(services);
      return services;
    } catch (e) {
      throw e;
    }
  }
  /** Update the service */
  async updateService(
    serviceId: string,
    dto: UpdateServiceDto,
    userId: string,
  ): Promise<ServiceDTO> {
    try {
      const service = await this.serviceModel.findOne({ _id: serviceId });
      this.checkFundingService(service);
      const funder = await this.model.findOne({ _id: service.funderId });
      this.checkFunder(funder);
      if (dto.name) service.name = dto.name;
      if (dto.rate) service.rate = dto.rate;
      if (dto.cptCode) service.cptCode = dto.cptCode;
      if (dto.size) service.size = dto.size;
      if (dto.min) service.min = dto.min;
      if (dto.max) service.max = dto.max;
      if (dto.globServiceId) {
        service.serviceId = dto.globServiceId;
      }
      await service.save();
      await this.historyService.create({
        resource: funder._id,
        onModel: 'Funder',
        title: serviceLog.updateServiceTitle,
        user: userId,
      });
      return service;
      // return this.sanitizer.sanitize(service);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Service already exists');
      throw e;
    }
  }
}
