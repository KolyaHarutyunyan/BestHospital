import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserType } from '../../authN';
import { serviceLog } from '../../history/history.constants';
import { CreateServiceDTO, UpdateServiceDto, ServiceDTO } from '../dto';
import { BaseService } from './base.service';
import { CredentialService } from '../../credential';

@Injectable()
export class Service extends BaseService {
  /** Create a new service */
  async createService(dto: CreateServiceDTO, _id: string): Promise<ServiceDTO> {
    try {
      this.checkUser(dto.user.type as UserType, [UserType.ADMIN]);
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
        chargeRate: dto.chargeRate,
      });
      if (dto.credentialIds) {
        const ids = [];
        dto.credentialIds.map((credential) => {
          service.credentialIds.push(credential.id);
          return ids.push(credential.id);
        });
        const credentials = await this.credentialService.findAllByIds(ids);
        if (ids.length > credentials.length) {
          throw new HttpException('some credentials were not found', HttpStatus.NOT_FOUND);
        }
      }
      await Promise.all([
        service.save(),
        this.historyService.create({
          resource: _id,
          onModel: 'Funder',
          title: serviceLog.createServiceTitle,
          user: dto.user.id,
        }),
      ]);
      return this.sanitizer.serviceSanitize(service);
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
      const services = await this.serviceModel.find({ funderId: _id }).populate('credentialIds');
      return this.sanitizer.serviceSanitizeMany(services);
    } catch (e) {
      throw e;
    }
  }
  /** returns service by id */
  async findService(_id: string): Promise<any> {
    try {
      const service = await this.serviceModel.findById({ _id }).populate('credentialIds');
      this.checkFundingService(service);
      return this.sanitizer.serviceSanitize(service);
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
        .populate('modifiers')
        .populate('credentialIds');
      return this.sanitizer.serviceSanitizeMany(services);
    } catch (e) {
      throw e;
    }
  }
  /** Update the service */
  async updateService(serviceId: string, dto: UpdateServiceDto): Promise<ServiceDTO> {
    try {
      this.checkUser(dto.user.type as UserType, [UserType.ADMIN]);
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
      if (dto.globServiceId) service.serviceId = dto.globServiceId;
      if (dto.chargeRate) service.chargeRate = dto.chargeRate;
      await Promise.all([
        service.save(),
        this.historyService.create({
          resource: funder._id,
          onModel: 'Funder',
          title: serviceLog.updateServiceTitle,
          user: dto.user.id,
        }),
      ]);
      return this.sanitizer.serviceSanitize(service);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Service already exists');
      throw e;
    }
  }
}
