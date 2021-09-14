import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { CreatePayCodeTypeDTO, UpdatePayCodeTypeDTO, PayCodeTypeDTO } from './dto';
import { IPayCodeType } from './interface';
import { PayCodeTypeModel } from './payCodeModel';
import { PayCodeTypeSanitizer } from './interceptor/paycodetype.interceptor';
import { PayCodeDTO } from 'src/employment/paycode/dto';


@Injectable()
export class PaycodetypeService {
  constructor(
    // private readonly employmentService: EmploymentService,
    // private readonly PayCodeTypeService: PayCodeTypeService,
    private readonly sanitizer: PayCodeTypeSanitizer,

  ) {
    this.model = PayCodeTypeModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IPayCodeType>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreatePayCodeTypeDTO): Promise<PayCodeTypeDTO> {
    const payCodeType = new this.model({
      name: dto.name,
      code: dto.code,
      type: dto.type,
      overtime: dto.overtime,
      pto: dto.pto
    })
    await payCodeType.save();
    return this.sanitizer.sanitize(payCodeType)
  }

  async findAll(): Promise<PayCodeTypeDTO[]> {
    try {
      const payCodeType = await this.model.find();
      this.checkPayCodeType(payCodeType[0]);
      return this.sanitizer.sanitizeMany(payCodeType)
    }
    catch (e) {
      throw e
    }
  }

  async findOne(_id: string): Promise<PayCodeTypeDTO> {
    let payCodeType = await this.model.findById({ _id })
    this.checkPayCodeType(payCodeType)
    return this.sanitizer.sanitize(payCodeType)
  }

  // update(id: number, dto: UpdatePaycodetypeDto) {
  //   return `This action updates a #${id} paycodetype`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} paycodetype`;
  // }

  /** Private methods */
  /** if the employment is not valid, throws an exception */
  private checkPayCodeType(payCodeType: IPayCodeType) {
    if (!payCodeType) {
      throw new HttpException(
        'PayCodeType with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
