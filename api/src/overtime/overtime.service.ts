import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { CreateOvertimeDTO, OvertimeDTO, UpdateOvertimeDTO } from './dto';
import { IOverTime } from './interface';
import { OverTimeModel } from './overtime.model';
import { OvertimeSanitizer } from './interceptor';

@Injectable()
export class OvertimeService {
  constructor(
    private readonly sanitizer: OvertimeSanitizer,
  ) {
    this.model = OverTimeModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IOverTime>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreateOvertimeDTO): Promise<OvertimeDTO> {
    try {
      const overtime = new this.model({
        name: dto.name,
        type: dto.type,
        multiplier: dto.multiplier,
        threshold: dto.threshold
      })
      await overtime.save()
      return this.sanitizer.sanitize(overtime)
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Overtime already exists');
      throw e;
    }
  }

  async findAll(): Promise<OvertimeDTO[]> {
    try {
      const overtime = await this.model.find();
      this.checkOvertime(overtime[0])
      return this.sanitizer.sanitizeMany(overtime)
    }
    catch (e) {
      throw e
    }
  }

  async findOne(_id: string): Promise<OvertimeDTO> {
    try {
      const overtime = await this.model.findById(_id);
      this.checkOvertime(overtime)
      return this.sanitizer.sanitize(overtime)
    }
    catch (e) {
      throw e
    }
  }

  async update(_id: string, dto: UpdateOvertimeDTO): Promise<OvertimeDTO> {
    try {
      const overtime = await this.model.findById(_id);
      this.checkOvertime(overtime);
      if (dto.name) overtime.name = dto.name;
      if (dto.type) overtime.type = dto.type;
      if (dto.multiplier) overtime.multiplier = dto.multiplier;
      if (dto.threshold) overtime.threshold = dto.threshold;

      await overtime.save();
      return this.sanitizer.sanitize(overtime);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Overtime already exists');
      throw e;
    }
  }

  async remove(_id: string): Promise<string> {
    const overtime = await this.model.findByIdAndDelete({ _id });
    this.checkOvertime(overtime);
    return overtime._id;
  }

  /** Private methods */
  /** if the Overtime is not found, throws an exception */
  private checkOvertime(overtime: IOverTime) {
    if (!overtime) {
      throw new HttpException(
        'Overtime with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
