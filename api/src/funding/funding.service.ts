import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserType } from '../authN';
import { serviceLog } from '../history/history.constants';
import { CreateTerminationDto } from '../termination/dto/create-termination.dto';
import { FundingDTO } from './dto';
import { CreateFundingDTO } from './dto/create.dto';
import { UpdateFundingDto } from './dto/edit.dto';
import { FundingStatus } from './funding.constants';
import { BaseService } from './services/base.service';

@Injectable()
export class FundingService extends BaseService {
  /** Create a new funder */
  async create(dto: CreateFundingDTO, userId: string): Promise<FundingDTO> {
    try {
      this.checkUser(dto.user.type as UserType, [UserType.ADMIN]);
      const funder = new this.model({
        name: dto.name,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        type: dto.type,
        website: dto.website,
        contact: dto.contact,
        address: await this.addressService.getAddress(dto.address),
      });
      const [funderSave] = await Promise.all([
        funder.save(),
        this.historyService.create({
          resource: funder._id,
          onModel: 'Funder',
          title: serviceLog.createFundingSource,
          user: userId,
        }),
      ]);
      return this.sanitizer.sanitize(funderSave);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Funder already exists');
      throw e;
    }
  }

  /** returns all funders */
  async findAll(skip: number, limit: number, status: string): Promise<any> {
    const [funder, count] = await Promise.all([
      this.model.find({ status }).sort({ _id: -1 }).skip(skip).limit(limit),
      this.model.countDocuments({ status: status ? status : FundingStatus.ACTIVE }),
    ]);
    const sanFun = this.sanitizer.sanitizeMany(funder);
    return { funders: sanFun, count };
  }

  /** Get Funder By Id */
  async findById(_id: string): Promise<FundingDTO> {
    const funder = await this.model.findById({ _id });
    this.checkFunder(funder);
    return this.sanitizer.sanitize(funder);
  }

  /** Get Funder By Name */
  async findByName(name: string): Promise<FundingDTO> {
    const funder = await this.model.findOne({ name });
    this.checkFunder(funder);
    return this.sanitizer.sanitize(funder);
  }

  /** Update the funder */
  async update(_id: string, dto: UpdateFundingDto, userId: string): Promise<FundingDTO> {
    try {
      this.checkUser(dto.user.type as UserType, [UserType.ADMIN]);
      const funder = await this.model.findOne({ _id });
      this.checkFunder(funder);
      if (dto.email) funder.email = dto.email;
      if (dto.phoneNumber) funder.phoneNumber = dto.phoneNumber;
      if (dto.type) funder.type = dto.type;
      if (dto.name) funder.name = dto.name;
      if (dto.website) funder.website = dto.website;
      if (dto.contact) funder.contact = dto.contact;
      if (dto.address) funder.address = await this.addressService.getAddress(dto.address);
      await Promise.all([
        funder.save(),
        this.historyService.create({
          resource: _id,
          onModel: 'Funder',
          title: serviceLog.updateFundingSource,
          user: userId,
        }),
      ]);
      return this.sanitizer.sanitize(funder);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Funder already exists');
      throw e;
    }
  }

  /** Delete the funder */
  async remove(_id: string): Promise<string> {
    const funder = await this.model.findByIdAndDelete({ _id });
    this.checkFunder(funder);
    return funder._id;
  }
  /** activate the funder */
  async active(_id: string, dto: CreateTerminationDto): Promise<FundingDTO> {
    this.checkUser(dto.user.type as UserType, [UserType.ADMIN]);
    const funder = await this.model.findById({ _id });
    this.checkFunder(funder);
    dto.date ? (funder.termination.date = dto.date) : undefined;
    dto.reason ? (funder.termination.reason = dto.reason) : undefined;
    funder.status = FundingStatus.ACTIVE;
    await funder.save();
    return this.sanitizer.sanitize(funder);
  }
  /** inActivate the funder */
  async inActive(_id: string, dto: CreateTerminationDto): Promise<FundingDTO> {
    // its services cannot be used in new appointments
    this.checkUser(dto.user.type as UserType, [UserType.ADMIN]);
    if (!dto.date) {
      throw new HttpException(
        'If status is not active, then date is required field',
        HttpStatus.BAD_REQUEST,
      );
    }
    const funder = await this.model.findById({ _id });
    this.checkFunder(funder);
    dto.date ? (funder.termination.date = dto.date) : undefined;
    dto.reason ? (funder.termination.reason = dto.reason) : undefined;
    funder.status = FundingStatus.INACTIVE;
    await funder.save();
    return this.sanitizer.sanitize(funder);
  }
}
