import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
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
  }
  private model: Model<IPayCode>;

  // create the paycode
  async create(dto: CreatePaycodeDTO): Promise<PayCodeDTO> {
    const employment = await this.employmentService.findOne(dto.employmentId);
    const payCodeType = await this.PayCodeTypeService.findOne(dto.payCodeTypeId);
    const paycode = new this.model({
      employmentId: employment.id,
      payCodeTypeId: payCodeType.id,
      name: dto.name,
      rate: dto.rate,
      active: dto.active,
      startDate: dto.startDate,
    });
    if (!dto.active && !dto.endDate) {
      throw new HttpException('endDate required field', HttpStatus.BAD_REQUEST);
    }
    if (dto.endDate && !dto.active) paycode.endDate = dto.endDate;
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

  // update the payCode
  async update(_id: string, dto: UpdatePayCodeDTO): Promise<PayCodeDTO> {
    try {
      let payCode = await this.model.findById(_id);
      this.checkPayCode(payCode);

      if (dto.payCodeTypeId) {
        await this.PayCodeTypeService.findOne(dto.payCodeTypeId);
        payCode.payCodeTypeId = dto.payCodeTypeId;
      }
      if (dto.employmentId) {
        await this.employmentService.findOne(dto.employmentId);
        payCode.employmentId = dto.employmentId;
      }
      if (dto.name) {
        payCode.name = dto.name;
      }
      if (dto.rate) payCode.rate = dto.rate;
      if (!dto.active && !dto.endDate) {
        throw new HttpException('endDate required field', HttpStatus.BAD_REQUEST);
      }
      if (dto.active && !dto.endDate) {
        payCode.endDate = 'Precent';
      }
      if (dto.endDate && !dto.active) payCode.endDate = dto.endDate;
      if (dto.startDate) payCode.startDate = dto.startDate;
      payCode = await (await payCode.save()).populate('payCodeTypeId').execPopulate();
      return this.sanitizer.sanitize(payCode);
    } catch (e) {
      throw e;
    }
  }

  // remove(id: string) {
  //   return `This action removes a #${id} paycode`;
  // }

  /** Private methods */
  /** if the employment is not valid, throws an exception */
  private checkPayCode(payCode: IPayCode) {
    if (!payCode) {
      throw new HttpException('PayCode with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}
