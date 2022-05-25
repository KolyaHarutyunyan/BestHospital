import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { serviceLog } from '../history/history.constants';
import { CreateTerminationDto } from '../termination/dto/create-termination.dto';
import { FundingDTO } from './dto';
import { CreateFundingDTO } from './dto/create.dto';
import { UpdateFundingDto } from './dto/edit.dto';
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
        website: dto.website,
        contact: dto.contact,
        address: await this.addressService.getAddress(dto.address),
      });
      await funder.save();
      await this.historyService.create({
        resource: funder._id,
        onModel: 'Funder',
        title: serviceLog.createFundingSource,
        user: userId,
      });
      return this.sanitizer.sanitize(funder);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Funder already exists');
      throw e;
    }
  }

  /** returns all funders */
  async findAll(skip: number, limit: number, status: string): Promise<any> {
    if (!status) {
      status = 'ACTIVE';
    }
    const [funders, count] = await Promise.all([
      this.model.find({ status }).sort({ _id: -1 }).skip(skip).limit(limit),
      this.model.countDocuments({ status }),
    ]);
    const sanFun = this.sanitizer.sanitizeMany(funders);
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
      const funder = await this.model.findOne({ _id });
      this.checkFunder(funder);
      if (dto.email) funder.email = dto.email;
      if (dto.phoneNumber) funder.phoneNumber = dto.phoneNumber;
      if (dto.type) funder.type = dto.type;
      if (dto.name) funder.name = dto.name;
      if (dto.website) funder.website = dto.website;
      if (dto.contact) funder.contact = dto.contact;
      if (dto.address) funder.address = await this.addressService.getAddress(dto.address);
      await funder.save();
      await this.historyService.create({
        resource: _id,
        onModel: 'Funder',
        title: serviceLog.updateFundingSource,
        user: userId,
      });
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
    return funder._id;
  }

  /** Set Status of a Funder Inactive*/
  setStatus = async (
    _id: string,
    status: string,
    dto: CreateTerminationDto,
  ): Promise<FundingDTO> => {
    const funder = await this.model.findById({ _id });
    this.checkFunder(funder);
    if (status != 'ACTIVE' && !dto.date) {
      throw new HttpException(
        'If status is not active, then date is required field',
        HttpStatus.BAD_REQUEST,
      );
    }
    funder.termination.date = dto.date;
    funder.status = status;
    if (dto.reason) {
      funder.termination.reason = dto.reason;
    }
    await funder.save();
    return this.sanitizer.sanitize(funder);
  };
}
