import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateFundingDTO } from './dto/create.dto';
import { UpdateFundingDto } from './dto/edit.dto';
import { FundingModel } from './funding.model';
import { ServiceModel } from './service.model';
import { IFunder, IService } from './interface';
import { MongooseUtil } from '../util';
import { AddressService } from '../address/address.service';
import { FundingSanitizer } from './interceptor';
import { FundingDTO, ServiceDTO, UpdateServiceDto, CreateServiceDTO } from './dto';
import { ServiceService } from '../service';
import { HistoryService, serviceLog } from '../history';
import { CredentialService } from '../credential';
import { CreateTerminationDto } from '../termination/dto/create-termination.dto';
import { CreateModifierDto } from './modifier/dto';

@Injectable()
export class FundingService {
  constructor(
    private readonly addressService: AddressService,
    private readonly service: ServiceService,
    private readonly historyService: HistoryService,
    private readonly credentialService: CredentialService,
    private readonly sanitizer: FundingSanitizer,

  ) {
    this.model = FundingModel;
    this.serviceModel = ServiceModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IFunder>;
  private serviceModel: Model<IService>;

  private mongooseUtil: MongooseUtil;

  /** Create a new funder */
  async create(dto: CreateFundingDTO): Promise<FundingDTO> {
    try {
      let funder = new this.model({
        name: dto.name,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        type: dto.type,
        website: dto.website,
        contact: dto.contact,
        address: await this.addressService.getAddress(dto.address)
      });
      await funder.save();
      await this.historyService.create({ resource: funder._id, onModel: "Funder", title: serviceLog.createFundingSource });
      return this.sanitizer.sanitize(funder);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Funder already exists');
      throw e;
    }
  }

  /** Create a new service */
  async createService(dto: CreateServiceDTO, _id: string): Promise<ServiceDTO> {
    try {
      const funder = await this.model.findById({ _id });
      this.checkFunder(funder)
      const globService = await this.service.findOne(dto.serviceId);
      let service = new this.serviceModel({
        funderId: _id,
        serviceId: globService.id,
        name: dto.name,
        rate: dto.rate,
        cptCode: dto.cptCode,
        size: dto.size,
        min: dto.min,
        max: dto.max
      });
      await service.save();
      await this.historyService.create({ resource: _id, onModel: "Funder", title: serviceLog.createServiceTitle });
      // return this.sanitizer.sanitize(service)
      return service;
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Service already exists');
      throw e;
    }

  }

  /** returns all funders */
  async findAll(skip: number, limit: number, status: string): Promise<any> {
    if (status == "INACTIVE" || status == "HOLD" || status == "TERMINATE") {
      let [funders, count] = await Promise.all([
        this.model.find({ $or: [{ status: "INACTIVE" }, { status: "HOLD" }, { status: "TERMINATE" }] }).sort({ '_id': -1 }).skip(skip).limit(limit),
        this.model.countDocuments({ $or: [{ status: "INACTIVE" }, { status: "HOLD" }, { status: "TERMINATE" }] })
      ]);
      const sanFun = this.sanitizer.sanitizeMany(funders);
      return { funders: sanFun, count }
    }
    let [funders, count] = await Promise.all([
      (await this.model.find({ status: "ACTIVE" }).sort({ '_id': 1 }).skip(skip).limit(limit)).reverse(),
      this.model.countDocuments({ status: "ACTIVE" })
    ]);
    const sanFun = this.sanitizer.sanitizeMany(funders);
    return { funders: sanFun, count }
  }

  /** returns all services */
  async findAllServices(_id: string): Promise<ServiceDTO[]> {
    try {
      const funder = await this.model.findById({ _id });
      this.checkFunder(funder);
      const services = await this.serviceModel.find({ funderId: _id })
      this.checkFundingService(services[0])
      // return this.sanitizer.sanitizeMany(services);
      return services
    } catch (e) {
      throw e;
    }
  }
  /** returns service by id */
  async findService(_id: string): Promise<any> {
    try {
      const services = await this.serviceModel.findById({ _id });
      this.checkFundingService(services)
      return services
    } catch (e) {
      throw e;
    }
  }
  /** returns all services for client*/
  async findAllServiceForClient(_id: string, fundingServiceId: string): Promise<ServiceDTO[]> {
    try {
      const funder = await this.model.findOne({ _id });
      this.checkFunder(funder);
      const services = await this.serviceModel.find({ funderId: _id, _id: fundingServiceId }).populate('modifiers');
      // return this.sanitizer.sanitizeMany(services);
      return services
    } catch (e) {
      throw e;
    }
  }

  /** Get Funder By Id */
  async findById(_id: string): Promise<FundingDTO> {
    const funder = await this.model.findById({ _id });
    this.checkFunder(funder);
    return this.sanitizer.sanitize(funder);
  }

  /** Get Funder Service By Id */
  async findOneService(_id: string): Promise<any> {
    const fundingService = await this.serviceModel.findOne({ _id }).populate('modifiers');
    this.checkFundingService(fundingService);
    return fundingService;
    // return this.sanitizer.sanitize(funder);
  }
  /** Get Funder By Name */
  async findByName(name: string): Promise<FundingDTO> {
    const funder = await this.model.findOne({ name });
    this.checkFunder(funder);
    return this.sanitizer.sanitize(funder);
  }

  /** Update the funder */
  async update(_id: string, dto: UpdateFundingDto): Promise<FundingDTO> {
    try {
      const funder = await this.model.findOne({ _id });
      this.checkFunder(funder);
      if (dto.email) funder.email = dto.email;
      if (dto.phoneNumber) funder.phoneNumber = dto.phoneNumber;
      if (dto.type) funder.type = dto.type;
      if (dto.name) funder.name = dto.name;
      if (dto.website) funder.website = dto.website;
      if (dto.contact) funder.contact = dto.contact;
      if (dto.address)
        funder.address = await this.addressService.getAddress(dto.address);
      await funder.save();
      await this.historyService.create({ resource: _id, onModel: "Funder", title: serviceLog.updateFundingSource });
      return this.sanitizer.sanitize(funder);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Funder already exists');
      throw e;
    }
  }

  /** Update the service */
  async updateService(serviceId: string, dto: UpdateServiceDto): Promise<ServiceDTO> {
    try {
      const service = await this.serviceModel.findOne({ _id: serviceId });
      this.checkFundingService(service)
      const funder = await this.model.findOne({ _id: service.funderId });
      this.checkFunder(funder)
      if (dto.name) service.name = dto.name;
      if (dto.rate) service.rate = dto.rate;
      if (dto.cptCode) service.cptCode = dto.cptCode;
      if (dto.size) service.size = dto.size;
      if (dto.min) service.min = dto.min;
      if (dto.max) service.max = dto.max;
      if (dto.globServiceId) {
        service.serviceId = dto.globServiceId
      }
      await service.save();
      await this.historyService.create({ resource: funder._id, onModel: "Funder", title: serviceLog.updateServiceTitle });
      return service;
      // return this.sanitizer.sanitize(service);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Service already exists');
      throw e;
    }
  }

  /** Delete the funder */
  async remove(_id: string): Promise<FundingDTO> {
    const funder = await this.model.findByIdAndDelete({ _id });
    this.checkFunder(funder);
    return funder._id;
  }

  /** Set Status of a Funder Inactive*/
  setStatus = async (
    _id: string,
    status: string,
    dto: CreateTerminationDto
  ): Promise<FundingDTO> => {
    const funder = await this.model.findById({ _id });
    this.checkFunder(funder);
    if (status != "ACTIVE" && !dto.date) {
      throw new HttpException('If status is not active, then date is required field', HttpStatus.BAD_REQUEST);
    }
    funder.termination.date = dto.date;
    funder.status = status;
    if (dto.reason) {
      funder.termination.reason = dto.reason;
    }
    await funder.save();
    return this.sanitizer.sanitize(funder);
  };

  /** save modifiers */
  async saveModifiers(_id: string, modifiers: any): Promise<ServiceDTO> {
    const fundingService = await this.serviceModel.findOne({ _id });
    this.checkFundingService(fundingService);
    modifiers.map(modifier => {
      fundingService.modifiers.push(modifier)
    })
    return await fundingService.save();
  }

  /** update modifiers */
  async updateModifiers(_id: string, modifier: any): Promise<ServiceDTO> {
    const fundingService = await this.serviceModel.findById(_id);
    this.checkFundingService(fundingService);
    fundingService.modifiers = modifier;
    return await fundingService.save();
  }

  /** Private methods */
  /** if the funder is not found, throws an exception */
  private checkFunder(funder: IFunder) {
    if (!funder) {
      throw new HttpException(
        'Funder with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /** if the fundingService is not found, throws an exception */
  private checkFundingService(funder: IService) {
    if (!funder) {
      throw new HttpException(
        'Funding Service with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
