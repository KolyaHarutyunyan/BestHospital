import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { AvailabilityDTO, CreateAvailabilityDTO } from './dto';
import { AvailabilityModel } from './availability.model';
import { ClientService } from '../client/client.service';
import { StaffService } from '../staff';
import { AvailabilitySanitizer } from './interceptor';

@Injectable()
export class AvailabilityService {
  constructor(
    private readonly Client: ClientService,
    private readonly Staff: StaffService,
    private readonly sanitizer: AvailabilitySanitizer,
  ) {
    this.model = AvailabilityModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<any>;
  private mongooseUtil: MongooseUtil;

  async createSchedule(dto: CreateAvailabilityDTO, owner: string, onModel: string): Promise<AvailabilityDTO> {
    try {
      const onMod = onModel;
      const resource = await this[onMod].findById(owner);
      const findSchedule = await this.model.findOne({ owner });
      if (!findSchedule) {
        const schedule = new this.model({
          owner,
          onModel
        })
        for (var day in dto) {
          dto[day].map(val => {
            schedule[day].push(val)
          })
        }
        return await schedule.save();
      }
      findSchedule['monday'] = [];
      findSchedule['tuesday'] = [];
      findSchedule['wednesday'] = [];
      findSchedule['thursday'] = [];
      findSchedule['friday'] = [];
      findSchedule['saturday'] = [];
      findSchedule['sunday'] = [];
      for (var day in dto) {
        dto[day].map(val => {
          findSchedule[day].push(val)
        })
      }
     await findSchedule.save();
     return this.sanitizer.sanitize(findSchedule);
    }
    catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Availability already exists');
      throw e;
    }
  }

  async findOne(owner: string):Promise<AvailabilityDTO> {
    try {
      const schedule = await this.model
        .findOne({ owner })
        .populate("owner");
      this.checkSchedule(schedule)
      return this.sanitizer.sanitize(schedule)
    } catch (e) {
      throw e;
    }
  }

  /** if the client is not found, throws an exception */
  private checkSchedule(schedule: any) {
    if (!schedule) {
      throw new HttpException(
        'ScheduleFragment with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
