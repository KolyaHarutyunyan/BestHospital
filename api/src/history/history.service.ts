import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { AdminService } from '../admin';
import { CreateHistoryDto } from './dto/create.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { HistoryModel } from './history.model';
import { IHistory } from './interface';

@Injectable()
export class HistoryService {
  constructor(
    // private readonly sanitizer: ServiceSanitizer,
  ) {
    this.model = HistoryModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IHistory>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreateHistoryDto) {
    try {
      //  const staff = await this.adminService.findById(dto.staffId);
      // get Admin firstName
      const firstName = 'Edgar';
      const history = new this.model({
        funderId: dto.funderId,
        title: `${firstName} ${dto.modify} a new ${dto.type}`,
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
  async findAll(funderId: string): Promise<any> {
    try {
      const histories = await this.model.find({ funderId });
      return histories;
      // return this.sanitizer.sanitizeMany(services);
    } catch (e) {
      throw e;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} history`;
  }

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
  
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
