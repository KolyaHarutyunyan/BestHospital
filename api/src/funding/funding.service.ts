import { Injectable } from '@nestjs/common';
import { UserType } from '../authN';
import { serviceLog } from '../history/history.constants';
import { FundingDTO } from './dto';
import { CreateFundingDTO } from './dto/create.dto';
import { UpdateFundingDto } from './dto/edit.dto';
import { FundingStatus } from './funding.constants';
import { IFunderCount } from './interface';
import { BaseService } from './services/base.service';

@Injectable()
export class FundingService extends BaseService {
  /** Create a new funder */
  async create(dto: CreateFundingDTO, userId: string): Promise<FundingDTO> {
    try {
      const funder = new this.model({
        name: dto.name,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        type: dto.type,
        address: await this.addressService.getAddress(dto.address),
      });
      if (dto.website) funder.website = dto.website;
      if (dto.contact) funder.contact = dto.contact;
      await Promise.all([
        funder.save(),
        this.historyService.create({
          resource: funder._id,
          onModel: 'Funder',
          title: serviceLog.createFundingSource,
          user: userId,
        }),
      ]);
      return this.sanitizer.sanitize(funder);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Funder already exists');
      throw e;
    }
  }

  /** returns all funders */
  async findAll(skip: number, limit: number, status: string): Promise<IFunderCount> {
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

  /** activate the funder */
  async active(_id: string): Promise<FundingDTO> {
    const funder = await this.model.findById({ _id });
    this.checkFunder(funder);
    funder.status = FundingStatus.ACTIVE;
    await funder.save();
    return this.sanitizer.sanitize(funder);
  }
  /** inActivate the funder */
  async inActive(_id: string): Promise<FundingDTO> {
    // its services cannot be used in new appointments
    const funder = await this.model.findById({ _id });
    this.checkFunder(funder);
    funder.status = FundingStatus.INACTIVE;
    await funder.save();
    return this.sanitizer.sanitize(funder);
  }
}
