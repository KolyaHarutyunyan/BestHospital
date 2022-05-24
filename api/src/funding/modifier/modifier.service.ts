import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MongooseUtil } from '../../util/mongoose.util';
import { CreateModifiersDTO, UpdateModifiersDto } from './dto';
import { FundingService } from '../funding.service';
import { IModify } from './interface/modify.interface';
import { ServiceDTO } from '../dto';

@Injectable()
export class ModifierService {
  constructor(private readonly fundingService: FundingService) {
    this.mongooseUtil = new MongooseUtil();
  }
  private mongooseUtil: MongooseUtil;

  /** find modifier by service id */
  async findByServiceId(fundingServiceId: string): Promise<ServiceDTO> {
    const modifiers = await this.fundingService.findService(fundingServiceId);
    return modifiers;
    // return this.sanitizer.sanitizeMany(modifiers);
  }


  /** Delete the modifiers */
  async delete(fundingServiceId: string, ids: string[]): Promise<any> {
    try {
      return await this.fundingService.deleteModifiers(fundingServiceId, ids);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Modifier already exists');
      throw e;
    }
  }
  /** Private methods */
  /** if the modifier is not found, throws an exception */
  private checkModify(modify: IModify) {
    if (!modify) {
      throw new HttpException('Modifier was not found', HttpStatus.NOT_FOUND);
    }
  }
}
