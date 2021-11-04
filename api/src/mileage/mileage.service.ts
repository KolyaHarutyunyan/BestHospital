import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { MileageDTO, CreateMileageDto, UpdateMileageDto } from './dto';
import { MileageSanitizer } from './interceptor/mileage.interceptor';
import { IMileage } from './interface/mileage.interface';
import { MileageModel } from './mileage.model';

@Injectable()
export class MileageService {
  constructor(
    private readonly sanitizer: MileageSanitizer,
  ) {
    this.model = MileageModel;
  }
  private model: Model<IMileage>;

  async create(dto: CreateMileageDto): Promise<MileageDTO> {
    const mileage = new this.model({
      compensation: dto.compensation,
      startDate: dto.startDate
    })
    await mileage.save();
    return this.sanitizer.sanitize(mileage);
  }

  async findAll(): Promise<MileageDTO[]> {
    const mileages = await this.model.find();
    this.checkMileage(mileages[0]);
    return this.sanitizer.sanitizeMany(mileages);
  }

  async findOne(_id: string): Promise<MileageDTO> {
    const mileage = await this.model.findById(_id);
    this.checkMileage(mileage);
    return this.sanitizer.sanitize(mileage);
  }

  async update(_id: string, dto: UpdateMileageDto): Promise<MileageDTO> {
    const mileage = await this.model.findById(_id);
    this.checkMileage(mileage);
    if (dto.compensation) mileage.compensation = dto.compensation;
    if (dto.startDate) mileage.startDate = dto.startDate;
    await mileage.save()
    return this.sanitizer.sanitize(mileage);
  }

  async remove(_id: string): Promise<String> {
    const mileage = await this.model.findByIdAndDelete(_id);
    this.checkMileage(mileage);
    return mileage._id;
  }

  /** Private methods */
  /** if the Mileage is not found, throws an exception */
  private checkMileage(mileage: IMileage) {
    if (!mileage) {
      throw new HttpException(
        'Mileage with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
