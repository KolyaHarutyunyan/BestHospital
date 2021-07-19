import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateFundingDTO } from './dto/create.dto';
import { UpdateFundingDto } from './dto/edit.dto';

import { ServiceDTO } from '../service/dto'
import { FundingModel } from './funding.model';
import { IFunder } from './interface';
import { MongooseUtil, ParseObjectIdPipe } from '../util';
import { AddressService } from '../address';
import { CreateServiceDto, UpdateServiceDto } from '../service/dto';
import { FundingSanitizer } from './interceptor';
import { FundingDTO } from './dto';
import { HistoryDto } from '../history/dto';
import { AuthNService } from 'src/authN';
import { IComment } from '../comment';
import { IHistory } from '../history';

import { ServiceService } from '../service';
import { CommentService } from '../comment';
import { HistoryService, serviceLog } from '../history';
@Injectable()
export class FundingService {
  constructor(
    private readonly addressService: AddressService,
    private readonly service: ServiceService,
    private readonly commentService: CommentService,
    private readonly historyService: HistoryService,


    private readonly sanitizer: FundingSanitizer,

  ) {
    this.model = FundingModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IFunder>;
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
        address: await this.addressService.getAddress(dto.address)
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
    const funder = await this.model.findOne({ _id });
    this.checkFunder(funder)
    const service = await this.service.create(dto, _id);
    await this.historyService.create(serviceLog.createServiceTitle, _id);
    return service;
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
    const funder = await this.model.findOne({ _id });
    this.checkFunder(funder);
    return await this.service.findAll(_id)
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
      if (dto.address)
        funder.address = await this.addressService.getAddress(dto.address);
      await funder.save();
      return this.sanitizer.sanitize(funder);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Funder already exists');
      throw e;
    }
  }

  /** Update the service */
  async updateService(serviceId: string, dto: UpdateServiceDto): Promise<ServiceDTO> {
    const service = await this.service.update(serviceId, dto)
    const funder = await this.model.findOne({ _id: service.funderId });
    await this.historyService.create(serviceLog.updateServiceTitle, funder._id);
    return service;
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
}
