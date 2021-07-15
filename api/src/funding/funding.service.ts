import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateFundingDTO } from './dto/create.dto';
import { UpdateFundingDto } from './dto/edit.dto';
import { FundingModel } from './funding.model';
import { IFunder } from './interface';
import { MongooseUtil, ParseObjectIdPipe } from '../util';
import { AddressService } from '../address';
import { FundingSanitizer } from './interceptor';
import { FundingDTO } from './dto';
import { AuthNService } from 'src/authN';

@Injectable()
export class FundingService {
  constructor(
    private readonly addressService: AddressService,
    private readonly authnService: AuthNService,
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

  /** Add a new comment */
  async addComment(_id: string, text: string): Promise<FundingDTO> {
    try {
      const funder = await this.model.findOne({_id});
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

  /** Get Funder By Id */
  async findOne(_id: string): Promise<FundingDTO[]> {
    const funder = await this.model.find({ _id });
    return this.sanitizer.sanitizeMany(funder);
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

  /** Delete the funder */
  async remove(_id: string): Promise<FundingDTO> {
    const funder = await this.model.findByIdAndDelete({ _id });
    this.checkFunder(funder);
    return this.sanitizer.sanitize(funder);
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
}
