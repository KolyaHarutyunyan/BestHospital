import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { CreateHistoryDto } from './dto/create.dto';
import { HistoryDto } from './dto/history.dto';
import { HistoryModel } from './history.model';
import { IHistory } from './interface';
import { HistorySanitizer } from './interceptor';

@Injectable()
export class HistoryService {
  constructor(
    private readonly sanitizer: HistorySanitizer
  ) {
    this.model = HistoryModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IHistory>;
  private mongooseUtil: MongooseUtil;

  /** Create a new history */
  async create(title: string, funderId: string): Promise<CreateHistoryDto> {
    try {
      // get Admin firstName
      const firstName = 'Edgar';
      const history = new this.model({
        funderId,
        title,
        time: this.formatAMPM(new Date()),
      });
      await history.save();

      return
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'History already exists');
      throw e;
    }
  }

  /** returns all histories */
  async findAll(funderId: string): Promise<HistoryDto[]> {
    try {
      const histories = await this.model.find({ funderId });
      this.checkHistory(histories);
      return this.sanitizer.sanitizeMany(histories);
    } catch (e) {
      throw e;
    }
  }

  /** Private methods */
  /** if the history is not found, throws an exception */
  private checkHistory(history: IHistory[]) {
    if (!history) {
      throw new HttpException(
        'History with this id was not found',
        HttpStatus.NOT_FOUND,
      );
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
