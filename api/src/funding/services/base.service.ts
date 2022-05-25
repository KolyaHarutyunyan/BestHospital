import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ServiceService } from '../../service';
import { HistoryService } from '../../history';
import { FundingModel } from '../funding.model';
import { IFunder, IService } from '../interface';
import { ServiceModel } from '../service.model';
import { MongooseUtil } from '../../util';
import { FundingSanitizer } from '../interceptor';
import { AddressService } from '../../address';

@Injectable()
export class BaseService {
  constructor(
    protected readonly historyService: HistoryService,
    protected readonly service: ServiceService,
    protected readonly addressService: AddressService,
    protected readonly sanitizer: FundingSanitizer,
  ) {
    this.model = FundingModel;
    this.serviceModel = ServiceModel;
    this.mongooseUtil = new MongooseUtil();
  }
  protected model: Model<IFunder>;
  protected serviceModel: Model<IService>;
  protected mongooseUtil: MongooseUtil;

  /** if the funder is not found, throws an exception */
  protected checkFunder(funder: IFunder) {
    if (!funder) {
      throw new HttpException('Funder with this id was not found', HttpStatus.NOT_FOUND);
    }
  }

  /** if the fundingService is not found, throws an exception */
  protected checkFundingService(funder: IService) {
    if (!funder) {
      throw new HttpException('Funding Service with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}
