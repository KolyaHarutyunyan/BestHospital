import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { CreateHistoryDTO, HistoryDTO } from './dto';
import { HistoryModel } from './history.model';
import { IHistory } from './interface';
import { HistorySanitizer } from './interceptor';

@Injectable()
export class HistoryService {
  constructor(private readonly sanitizer: HistorySanitizer) {
    this.model = HistoryModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IHistory>;
  private mongooseUtil: MongooseUtil;

  /** Create a new history */
  async create(dto: CreateHistoryDTO): Promise<HistoryDTO> {
    try {
      const onMod = dto.onModel;
      const history = new this.model({
        resource: dto.resource,
        onModel: dto.onModel,
        title: dto.title,
        time: this.formatAMPM(new Date()),
        user: dto.user,
      });
      return await history.save();
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'History already exists');
      throw e;
    }
  }

  /** returns all histories */
  async findAll(onModel: string, skip: number, limit: number, start: Date): Promise<HistoryDTO[]> {
    try {
      let noDate = true;
      let startDate, endDate;

      if (isNaN(start.getTime())) {
        noDate = false;
      } else {
        startDate = new Date(new Date(start).setHours(4, 0, 0));
        endDate = new Date(new Date(start).setHours(27, 59, 59));
      }
      const query: any = {};

      if (noDate) {
        query.createdDate = { $gte: startDate, $lte: endDate };
      }
      query.onModel = onModel;
      if (isNaN(skip)) skip = 0;
      if (isNaN(limit)) limit = 100;

      const histories = await this.model
        .aggregate([
          { $match: { ...query } },
          { $lookup: { from: 'staffs', localField: 'user', foreignField: '_id', as: 'user' } },
          { $sort: { _id: 1 } },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdDate' } },
              data: { $push: '$$ROOT' },
            },
          },
        ])
        .skip(skip)
        .limit(limit);
      return histories;
    } catch (e) {
      throw e;
    }
  }

  /** Private methods */
  /** if the history is not found, throws an exception */
  private checkHistory(history: IHistory) {
    if (!history) {
      throw new HttpException('History with this id was not found', HttpStatus.NOT_FOUND);
    }
  }

  //Get time like 10:00 AM
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}
