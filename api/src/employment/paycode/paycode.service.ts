import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../../util';
import { CreatePaycodeDTO, UpdatePaycodeDTO, PayCodeDTO } from './dto';
import { IPayCode } from './interface';
import { PayCodeModel } from './paycode.model';
import { EmploymentService } from '../employment.service';
import { PayCodeSanitizer } from './interceptor/sanitizer.interceptor';
import { PaycodetypeService } from '../../paycodetype/paycodetype.service';

@Injectable()
export class PaycodeService {
  constructor(
    private readonly employmentService: EmploymentService,
    private readonly PayCodeTypeService: PaycodetypeService,
    private readonly sanitizer: PayCodeSanitizer,

  ) {
    this.model = PayCodeModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IPayCode>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreatePaycodeDTO): Promise<PayCodeDTO> {
    const employment = await this.employmentService.findOne(dto.employmentId);
    const payCodeType = await this.PayCodeTypeService.findOne(dto.payCodeTypeId);

    const paycode = new this.model({
      employmentId: employment.id,
      payCodeTypeId: payCodeType.id,
      rate: dto.rate,
      active: dto.active,
      startDate: dto.startDate
    })
    if (dto.endDate) paycode.endDate = dto.endDate
    await paycode.save()
    return this.sanitizer.sanitize(paycode)
  }

  async findAll(): Promise<PayCodeDTO[]> {
    try {
      const payCode = await this.model.find();
      this.checkPayCode(payCode[0]);
      return this.sanitizer.sanitizeMany(payCode)
      // poopulate payCodeType
    }
    catch (e) {
      throw e
    }
  }

  async findOne(_id: string): Promise<PayCodeDTO> {
    try {
      let payCode = await this.model.findById({ _id })
      this.checkPayCode(payCode)
      return this.sanitizer.sanitize(payCode)
      // poopulate payCodeType

    }
    catch (e) {
      throw e
    }
  }

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
