import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateFundingDTO } from './dto/create.dto';
import { UpdateFundingDto } from './dto/edit.dto';
import { FundingModel } from './funding.model';
import { ServiceModel } from './service.model';
import { ModifyModel } from './modifier.model';
import { IFunder, IService, IModify } from './interface';
import { isValidObjectId, MongooseUtil, ParseObjectIdPipe } from '../util';
import { AddressService } from '../address';
import { FundingSanitizer } from './interceptor';
import { FundingDTO, ServiceDTO, UpdateServiceDto, CreateServiceDto, CreateModifierDto, UpdateModifierDto, ModifyDTO } from './dto';
import { HistoryDto } from '../history/dto';
import { AuthNService } from 'src/authN';
import { IComment } from '../comment';
import { IHistory } from '../history';

import { ServiceService } from '../service';
import { CommentService } from '../comment';
import { HistoryService, serviceLog } from '../history';
import { CredentialService } from '../credential';

@Injectable()
export class FundingService {
  constructor(
    // private readonly addressService: AddressService,
    private readonly service: ServiceService,
    private readonly commentService: CommentService,
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
        status: dto.status,
        // address: await this.addressService.getAddress(dto.address)
      });
      await funder.save();
      return this.sanitizer.sanitize(funder);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Funder already exists');
      throw e;
    }
  }

  /** Create a new service */
  async createService(dto: CreateServiceDto, _id: string): Promise<ServiceDTO> {
    try {
      const funder = await this.model.findOne({ _id });
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
        max: dto.max,
      });
      await service.save();
      await this.historyService.create(serviceLog.createServiceTitle, _id);
      // return this.sanitizer.sanitize(service)
      return service;
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Service already exists');
      throw e;
    }

  }

  /** Create a new modifier */
  async createModifier(dto: CreateModifierDto, serviceId: string): Promise<ModifyDTO> {
    try {
      const fundingService = await this.serviceModel.findOne({ _id: serviceId });
      this.checkFundingService(fundingService)
      const modify = new this.modifyModel({
        chargeRate: dto.chargeRate,
        name: dto.name,
        type: dto.type,
        credential: await this.checkCredential(dto.credentialId)
      })
      fundingService.modifiers.push(modify._id)
      await modify.save()
      await fundingService.save()
      return modify;
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

  /** Add a new comment */
  async addComment(_id: string, text: string): Promise<any> {
    const funder = await this.model.findOne({ _id });
    this.checkFunder(funder);
    const comment = await this.commentService.create(_id, text);
    await this.historyService.create(serviceLog.createCommentTitle, _id);
    return comment;
  }

  /** returns all funders */
  async findAll(skip: number, limit: number): Promise<FundingDTO[]> {

    if (isNaN(skip)) skip = 0;
    if (isNaN(limit)) limit = 10;

    const funders = await this.model.find({}).skip(skip).limit(limit);
    return this.sanitizer.sanitizeMany(funders);
  }

  /** returns all services */
  async findAllServices(_id: string): Promise<ServiceDTO[]> {
    try {
      const funder = await this.model.findOne({ _id });
      this.checkFunder(funder);
      const services = await this.serviceModel.find({ funderId: _id }).populate('serviceId').populate({
        path: 'modifiers',
        populate: { path: 'credential' }
      });
      // return this.sanitizer.sanitizeMany(services);
      return services
    } catch (e) {
      throw e;
    }
  }
    /** returns service by id */
    async findService(_id: string): Promise<ServiceDTO[]> {
      try {
        const services = await this.serviceModel.find({ _id }).populate('serviceId').populate({
          path: 'modifiers',
          populate: { path: 'credential' }
        });
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
  /** returns all comments */
  async getComments(_id, skip, limit): Promise<any> {
    const funder = await this.model.findOne({ _id });
    this.checkFunder(funder);
    return await this.commentService.findAll(_id, skip, limit);
  }

  /** returns all histories */
  async findAllHistories(_id: string): Promise<any> {
    try {
      const funder = await this.model.findOne({ _id });
      this.checkFunder(funder);
      return await this.historyService.findAll(_id);
      // return this.sanitizer.sanitizeMany(histories);
    } catch (e) {
      throw e;
    }
  }

  /** delete the comment */
  async removeComment(_id: string, funderId: string): Promise<string> {
    const funder = await this.model.findOne({ _id: funderId });
    this.checkFunder(funder);
    const comment = await this.commentService.remove(_id);
    await this.historyService.create(serviceLog.deleteCommentTitle, _id);
    return comment

  }

  /** Get Funder By Id */
  async findOne(_id: string): Promise<FundingDTO> {
    const funder = await this.model.findOne({ _id });
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
      if (dto.status) funder.status = dto.status;
      // if (dto.address)
      //   funder.address = await this.addressService.getAddress(dto.address);
      await funder.save();
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
      await this.historyService.create(serviceLog.updateServiceTitle, funder._id);
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
      const modifier = await this.modifyModel.findOne({ _id });
      this.checkModify(modifier);
      if (dto.chargeRate) modifier.chargeRate = dto.chargeRate;
      if (dto.modifierName) modifier.name = dto.modifierName;
      if (dto.type) modifier.type = dto.type;
      if (dto.credentialId) {
        isValidObjectId(dto.credentialId)
        await this.checkCredential(dto.credentialId)
        modifier.credential = dto.credentialId
      }
      return await modifier.save()

      // const modifier: any = await this.serviceModel.findOne({ _id: serviceId }, { 'chargeTable': { $elemMatch: { '_id': dto.modifierId } } });
      // const credential: any = await this.serviceModel.findOne({ _id: serviceId }, { 'chargeTable.credential': { $elemMatch: { '_id': dto.modifierId } } });

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
  /** if the comment is not found, throws an exception */
  private checkComment(comment: IComment) {
    if (!comment) {
      throw new HttpException(
        'Comment was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /** Private methods */
  /** if the history is not found, throws an exception */
  private checkHistory(history: IHistory) {
    if (!history) {
      throw new HttpException(
        'History was not found',
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
