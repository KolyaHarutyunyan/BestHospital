import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePaycodeDTO, PayCodeDTO } from './dto';
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
  }
  private model: Model<IPayCode>;

  // create the paycode
  async create(dto: CreatePaycodeDTO): Promise<PayCodeDTO> {
    const [employment, payCodeType, payCodes] = await Promise.all([
      this.employmentService.findOne(dto.employmentId),
      this.PayCodeTypeService.findOne(dto.payCodeTypeId),
      this.model.find({ employmentId: dto.employmentId, terminationDate: null }),
    ]);
    if (payCodes.length !== 0) {
      throw new HttpException(
        'Can not be two active payCodes with same employment',
        HttpStatus.BAD_REQUEST,
      );
    }
    const paycode = new this.model({
      employmentId: employment.id,
      payCodeTypeId: payCodeType.id,
      rate: dto.rate,
      startDate: dto.startDate,
    });
    await paycode.save();
    return this.sanitizer.sanitize(paycode);
  }

  // find all payCodes by employment id
  async findAllByEmployment(employmentId: string): Promise<PayCodeDTO[]> {
    try {
      const payCode = await this.model.find({ employmentId }).populate('payCodeTypeId');
      return this.sanitizer.sanitizeMany(payCode);
    } catch (e) {
      throw e;
    }
  }

  // find all payCode by staff id
  async findPayCodesByStaffId(staffId: string): Promise<PayCodeDTO[]> {
    try {
      const employments = await this.employmentService.findAllEmploymentsByStaffId(staffId);
      const payCode = await this.model
        .find({ employmentId: { $in: employments } })
        .populate('payCodeTypeId');
      return this.sanitizer.sanitizeMany(payCode);
    } catch (e) {
      throw e;
    }
  }

  // find all payCode
  async findAll(): Promise<PayCodeDTO[]> {
    try {
      const payCodes = await this.model.find({}).populate('payCodeTypeId').populate('employmentId');
      // const filterPayCodes = payCodes.filter((payCode) => {
      //   return payCode.employmentId.active === true;
      // });
      return this.sanitizer.sanitizeMany(payCodes);
    } catch (e) {
      throw e;
    }
  }

  // find employment by id
  async findOne(_id: string): Promise<PayCodeDTO> {
    try {
      const payCode = await this.model
        .findById({ _id })
        .populate('payCodeTypeId')
        .populate('employmentId');
      this.checkPayCode(payCode);
      return this.sanitizer.sanitize(payCode);
      // poopulate payCodeType
    } catch (e) {
      throw e;
    }
  }
  // activated the payCode
  // async active(_id: string): Promise<PayCodeDTO> {
  //   const payCode = await this.model.findById(_id);
  //   this.checkPayCode(payCode);
  //   payCode.active = true;
  //   await payCode.save();
  //   return this.sanitizer.sanitize(payCode);
  // }
  // inactivated the payCode
  async inActive(_id: string): Promise<PayCodeDTO> {
    const payCode = await this.model.findById(_id);
    this.checkPayCode(payCode);
    payCode.terminationDate = new Date(Date.now());
    await payCode.save();
    return this.sanitizer.sanitize(payCode);
  }
  /** Private methods */
  /** if the employment is not valid, throws an exception */
  private checkPayCode(payCode: IPayCode) {
    if (!payCode) {
      throw new HttpException('PayCode with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}
