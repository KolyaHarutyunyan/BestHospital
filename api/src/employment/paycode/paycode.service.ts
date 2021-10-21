import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../../util';
import { CreatePaycodeDTO, UpdatePayCodeDTO, PayCodeDTO } from './dto';
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
      name: dto.name,
      rate: dto.rate,
      active: dto.active,
      startDate: dto.startDate
    })
    if (!dto.active && !dto.endDate) {
      throw new HttpException(
        'endDate required field',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (dto.endDate && !dto.active) paycode.endDate = dto.endDate
    await paycode.save()
    return this.sanitizer.sanitize(paycode)
  }

  async findAllByEmployment(employmentId: string): Promise<PayCodeDTO[]> {
    try {
      const payCode = await this.model.find({ employmentId }).populate('payCodeTypeId');
      this.checkPayCode(payCode[0]);
      return this.sanitizer.sanitizeMany(payCode)
    }
    catch (e) {
      throw e
    }
  }
  async findPayCodesByStaffId(staffId: string): Promise<PayCodeDTO[]> {
    try {
      const employments = await this.employmentService.findAllEmploymentsByStaffId(staffId);
      const payCode = await this.model.find({ "employmentId": { $in: employments } }).populate('payCodeTypeId')
      this.checkPayCode(payCode[0]);
      return this.sanitizer.sanitizeMany(payCode)
    }
    catch (e) {
      throw e
    }
  }

  async findAll(): Promise<PayCodeDTO[]> {
    try {
      const payCode = await this.model.find({}).populate('payCodeTypeId');
      this.checkPayCode(payCode[0]);
      return this.sanitizer.sanitizeMany(payCode)
    }
    catch (e) {
      throw e
    }
  }
  async findOne(_id: string): Promise<PayCodeDTO> {
    try {
      let payCode = await this.model.findById({ _id }).populate('payCodeTypeId')
      this.checkPayCode(payCode)
      return this.sanitizer.sanitize(payCode)
      // poopulate payCodeType
    }
    catch (e) {
      throw e
    }
  }

  async update(_id: string, dto: UpdatePayCodeDTO): Promise<PayCodeDTO> {
    try {
      let payCode = await this.model.findById(_id);
      this.checkPayCode(payCode);
    
      if (dto.payCodeTypeId) {
        await this.PayCodeTypeService.findOne(dto.payCodeTypeId);
      }
      if (dto.employmentId) {
        await this.employmentService.findOne(dto.employmentId)
      }
      if(dto.name){
        payCode.name = dto.name;
      }
      if (dto.rate) payCode.rate = dto.rate;
      if (!dto.active && !dto.endDate) {
        throw new HttpException(
          'endDate required field',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (dto.active && !dto.endDate) {
        payCode.endDate = "Precent"
      }
      if (dto.endDate && !dto.active) payCode.endDate = dto.endDate;
      if (dto.startDate) payCode.startDate = dto.startDate;
      payCode = await (await payCode.save()).populate('payCodeTypeId').execPopulate();
      return this.sanitizer.sanitize(payCode);
    }
    catch (e) {
      throw e
    }
  }

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
