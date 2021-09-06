import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateFundingDTO } from './dto/create.dto';
import { UpdateFundingDto } from './dto/edit.dto';
import { FundingModel } from './funding.model';
import { ServiceModel } from './service.model';
import { ModifyModel } from './modifier.model';
import { IFunder, IService, IModify } from './interface';
import { isValidObjectId, MongooseUtil, ParseObjectIdPipe } from '../util';
import { AddressService } from '../address/address.service';
import { FundingSanitizer } from './interceptor';
import { FundingDTO, ServiceDTO, UpdateServiceDto, CreateServiceDTO, CreateModifierDto, CreateModifiersDTO, UpdateModifierDto, ModifyDTO } from './dto';
import { HistoryDTO } from '../history/dto';
import { AuthNService } from 'src/authN';
import { IComment } from '../comment';
import { IHistory } from '../history';

import { ServiceService } from '../service';
// import { CommentService } from '../comment';
import { HistoryService, serviceLog } from '../history';
import { CredentialService } from '../credential';
import { CreateTerminationDto } from '../termination/dto/create-termination.dto';

@Injectable()
export class FundingService {
  constructor(
    private readonly addressService: AddressService,
    private readonly service: ServiceService,
    // private readonly commentService: CommentService,
    private readonly historyService: HistoryService,
    private readonly credentialService: CredentialService,


    private readonly sanitizer: FundingSanitizer,

  ) {
    this.model = FundingModel;
    this.modifyModel = ModifyModel;
    this.serviceModel = ServiceModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IFunder>;
  private serviceModel: Model<IService>;
  private modifyModel: Model<IModify>;

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

  /** Create a new modifier */
  async createModifier(dto: CreateModifiersDTO): Promise<any> {
    try {
      const fundingService = await this.serviceModel.findById({ _id: dto.serviceId });
      this.checkFundingService(fundingService)

      dto.modifiers.map(modifier => {
        modifier.serviceId = fundingService._id;
      })

      const modifiers = await this.modifyModel.collection.insertMany(dto.modifiers);
      return modifiers.ops
      // fundingServiceId: fundingService._id,
      // chargeRate: dto.chargeRate,
      // name: dto.name,
      // type: dto.type,
      // credential: await this.checkCredential(dto.credentialId)
      // return await modify.save()

      // fundingService.modifiers.push(modify._id)

      // await fundingService.save()
      // fundingService.chargeTable.push({ chargeRate: dto.chargeRate, modifier: dto.modifier, credentials: await this.checkCredential(dto.credentialId) })
      // await fundingService.save()
      // return fundingService;
      // await this.historyService.create(serviceLog.createServiceTitle, _id);
      // return this.sanitizer.sanitize(fundingService)
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Modifier already exists');
      throw e;
    }

  }

  /** returns all funders */
  async findAll(skip: number, limit: number, status: number): Promise<any> {

    if (status == 0) {
      let [funders, count] = await Promise.all([
        this.model.find({ status: 0 }).skip(skip).limit(limit),
        this.model.countDocuments({ status: 0 })
      ]);
      const sanFun = this.sanitizer.sanitizeMany(funders);
      return { funders: sanFun, count }
    }

    let [funders, count] = await Promise.all([
      this.model.find({ status: 1 }).skip(skip).limit(limit),
      this.model.countDocuments({ status: 1 })
    ]);
    this.checkFunder(funders[0])

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
      this.checkFundingService(services[0])
      // const services = await this.serviceModel.find({ _id }).populate('serviceId').populate({
      //   path: 'modifiers',
      //   populate: { path: 'credential' }
      // });
      // return this.sanitizer.sanitizeMany(services);
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

  /** Get modifier By funding Service ID */
  async findmodifier(_id: string): Promise<any> {
    const modifiers = await this.modifyModel.find({ serviceId: _id });
    this.checkModify(modifiers[0]);
    return modifiers
    // return this.sanitizer.sanitize(funder);
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
      const funder = await this.model.findOne({ _id: service.funderId });
      // this.checkService(service);
      if (dto.name) service.name = dto.name;
      if (dto.rate) service.rate = dto.rate;
      if (dto.cptCode) service.rate = dto.rate;
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

  /** Update the modifier */
  async updateModifier(_id: string, dto: UpdateModifierDto): Promise<any> {
    try {
      // const service = await this.serviceModel.findOne({ _id: serviceId });
      // this.checkFundingService(service);
      const modifier = await this.modifyModel.findById({ _id });
      this.checkModify(modifier);
      if (dto.chargeRate) modifier.chargeRate = dto.chargeRate;
      if (dto.name) modifier.name = dto.name;
      if (dto.type || dto.type === 0) modifier.type = dto.type;
      if (dto.credentialId) {
        await this.checkCredential(dto.credentialId)
        modifier.credentialId = dto.credentialId
      }
      return await modifier.save()

      // const modifier: any = await this.serviceModel.findOne({ _id: serviceId }, { 'chargeTable': { $elemMatch: { '_id': dto.modifierId } } });
      // const system: any = await this.serviceModel.findOne({ _id: serviceId }, { 'chargeTable.credential': { $elemMatch: { '_id': dto.modifierId } } });

      // console.log(modifier.chargeTable[0], ' aaaaaa');
      // this.checkService(service);
      // if (dto.chargeRate) modifier.chargeTable[0].chargeRate = dto.chargeRate;
      // if (dto.modifierName) modifier.chargeTable[0].modifierName = dto.modifierName;


      // if (dto.max) service.max = dto.max;
      // await service.save();
      // await this.historyService.create(serviceLog.updateServiceTitle, funder._id);
      // return service;
      // return this.sanitizer.sanitize(service);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Modifier already exists');
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
  setStatusInactive = async (
    _id: string,
    status: number,
    dto: CreateTerminationDto
  ): Promise<FundingDTO> => {
    const funder = await this.model.findById({ _id });
    this.checkFunder(funder);

    funder.termination.date = dto.date;
    funder.status = status;
    if (dto.reason) {
      funder.termination.reason = dto.reason;
    }
    await funder.save();
    return this.sanitizer.sanitize(funder);
  };

  /** Set Status of a Funder Active */
  setStatusActive = async (
    id: string,
    status: number,
  ): Promise<FundingDTO> => {
    const funder = await this.model.findOneAndUpdate(
      { _id: id },
      { $set: { status: status, termination: null } },
      { new: true },
    );
    this.checkFunder(funder);
    return this.sanitizer.sanitize(funder);
  };
  
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

  /** Private methods */
  /** if the fundingService is not found, throws an exception */
  private checkFundingService(funder: IService) {
    if (!funder) {
      throw new HttpException(
        'Funding Service with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /** Private methods */
  /** if the modifier is not found, throws an exception */
  private checkModify(modify: IModify) {
    if (!modify) {
      throw new HttpException(
        'Modifier was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async checkCredential(credentialId: string): Promise<any> {
    if (credentialId) {
      const credential = await this.credentialService.findOne(credentialId);
      return credentialId
    };
    return null
  }
}
