import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../../util';
import { CreatePaycodeDTO, UpdatePaycodeDTO, PayCodeDTO } from './dto';
import { IPayCode } from './interface';
import { PayCodeModel } from './paycode.model';
import { EmploymentService } from '../employment.service';
import { PayCodeSanitizer } from './interceptor/sanitizer.interceptor';


@Injectable()
export class PaycodeService {
  constructor(
    private readonly employmentService: EmploymentService,
    // private readonly PayCodeTypeService: PayCodeTypeService,
    private readonly sanitizer: PayCodeSanitizer,

  ) {
    this.model = PayCodeModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IPayCode>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreatePaycodeDTO): Promise<PayCodeDTO> {
    const employment = await this.employmentService.findOne(dto.employmentId);
    // const payCodeType = await this.PayCodeTypeService.findOne(dto.payCodeTypeId);

    const paycode = new this.model({
      employmentId: employment.id,
      // payCodeTypeId: paCodeType._id
      rate: dto.rate,
      active: dto.active,
      startDate: dto.startDate
    })
    if(dto.endDate) paycode.endDate = dto.endDate
    await paycode.save()
    return this.sanitizer.sanitize(paycode)
  }

  // findAll() {
  //   return `This action returns all paycode`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} paycode`;
  // }

  // update(id: string, dto: UpdatePaycodeDTO) {
  //   return `This action updates a #${id} paycode`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} paycode`;
  // }

  /** Private methods */
  /** if the employment is not valid, throws an exception */
  private checkPayCode(payCode: IPayCode) {
    if (!payCode) {
      throw new HttpException(
        'PayCode with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
