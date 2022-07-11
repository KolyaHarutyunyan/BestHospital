import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { MileageDTO, CreateMileageDto, UpdateMileageDto } from './dto';
import { MileageSanitizer } from './interceptor/mileage.interceptor';
import { IMileage } from './interface/mileage.interface';
import { MileageModel } from './mileage.model';
import * as dateFns from 'date-fns';

@Injectable()
export class MileageService {
  constructor(private readonly sanitizer: MileageSanitizer) {
    this.model = MileageModel;
  }
  private model: Model<IMileage>;

  // create the mileage
  async create(dto: CreateMileageDto): Promise<MileageDTO> {
    const [mileages] = await Promise.all([
      this.model.find({ endDate: null }),
      this.checkOverlap(null, dto.startDate),
    ]);
    if (mileages.length !== 0) {
      throw new HttpException(`can not be two active mileage`, HttpStatus.BAD_REQUEST);
    }
    const mileage = new this.model({
      compensation: dto.compensation,
      startDate: dto.startDate,
    });
    // erb enq end Date dnum?
    await mileage.save();
    return this.sanitizer.sanitize(mileage);
  }

  // find all mileage
  async findAll(): Promise<MileageDTO[]> {
    const mileages = await this.model.find();
    return this.sanitizer.sanitizeMany(mileages);
  }

  // find mileage by id
  async findOne(_id: string): Promise<MileageDTO> {
    const mileage = await this.model.findById(_id);
    this.checkMileage(mileage);
    return this.sanitizer.sanitize(mileage);
  }

  // update the mileage
  async update(_id: string, dto: UpdateMileageDto): Promise<MileageDTO> {
    const mileage = await this.model.findById(_id);
    this.checkMileage(mileage);
    if (dto.compensation) mileage.compensation = dto.compensation;
    if (dto.startDate) mileage.startDate = dto.startDate;
    await mileage.save();
    return this.sanitizer.sanitize(mileage);
  }

  // remove the mileage
  async remove(_id: string): Promise<string> {
    const mileage = await this.model.findByIdAndDelete(_id);
    this.checkMileage(mileage);
    return mileage._id;
  }

  /** Private methods */
  /** if the Mileage is not found, throws an exception */
  private checkMileage(mileage: IMileage) {
    if (!mileage) {
      throw new HttpException('Mileage with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
  /** check mileage overlapping */
  private async checkOverlap(_id = null, startDate: Date) {
    const mileage = await this.model.find({
      startDate: {
        $gte: dateFns.startOfDay(new Date(startDate)),
        $lte: dateFns.endOfDay(new Date(startDate)),
      },
    });
    if (mileage[0] && mileage[0]._id.toString() !== _id.toString()) {
      throw new HttpException(`Mileage overlapping`, HttpStatus.BAD_REQUEST);
    }
  }
}
