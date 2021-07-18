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

@Injectable()
export class FundingService {
  constructor(
    private readonly addressService: AddressService,
    private readonly service: ServiceService,
    private readonly commentService: CommentService,


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

    const firstName = 'Edgar';
    const type = "service";
    const modify = "create";

    const service = await this.service.create(dto, _id);

    funder.histories.push({
      funderId: _id,
      title: `${firstName} ${modify} a new ${type}`,
      time: this.formatAMPM(new Date()),
    });
    await funder.save()
    return service;
  }

  /** Add a new comment */
  async addComment(_id: string, text: string): Promise<FundingDTO> {
    try {
      const funder = await this.model.findOne({ _id });
      this.checkFunder(funder);
      const data = {
        user: '60f01ec194abb63ff8f0aa75',
        text
      }
      funder.comments.push(data);
      await funder.save()
      return this.sanitizer.sanitize(funder);
    } catch (e) {
      throw e;
    }
  }

  /** returns all funders */
  async findAll(): Promise<FundingDTO[]> {
    const funders = await this.model.find({});
    return this.sanitizer.sanitizeMany(funders);
  }

  /** returns all services */
  async findAllServices(_id: string): Promise<ServiceDTO[]> {
    const funder = await this.model.findOne({ _id });
    this.checkFunder(funder);
    return await this.service.findAll(_id)
  }

  /** returns all comments */
  async getComments(_id): Promise<FundingDTO[]> {
    const funders = await this.model.find({ _id, comments: { $exists: true, $ne: [] } }, 'comments')
      .populate('comments.user', 'firstName lastName username');
    if (!funders.length) this.checkComment(null)
    // this.checkComment(funders);
    return this.sanitizer.sanitizeMany(funders);
  }

  /** returns all histories */
  async findAllHistories(_id: string): Promise<FundingDTO[]> {
    try {
      const histories = await this.model.find({ _id, histories: { $exists: true, $ne: [] } }, 'histories.title histories.time histories.date')
      // this.checkHistory(histories)
      return this.sanitizer.sanitizeMany(histories);
    } catch (e) {
      throw e;
    }
  }

  /** delete the comment */
  async removeComment(_id: string, funderId: string): Promise<string> {
    const funder = await this.model.findOne({ _id: funderId });
    this.checkFunder(funder);
    const comment = await this.model.updateOne({ _id: funderId }, { $pull: { comments: { _id } } });
    if (!comment.nModified) this.checkComment(null)
    // this.checkComment(funders);
    return _id
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
    const firstName = 'Edgar';
    const type = "service";
    const modify = "update";
    const service = await this.service.update(serviceId, dto)
    const funder = await this.model.findOne({ _id: service.funderId });
    funder.histories.push({
      funderId: funder._id,
      title: `${firstName} ${modify} a new ${type}`,
      time: this.formatAMPM(new Date()),
    });
    await funder.save()
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

  // Get time like 10:00 AM
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}
