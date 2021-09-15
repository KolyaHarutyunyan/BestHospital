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

  async update(_id: string, dto: UpdatePayCodeTypeDTO): Promise<PayCodeTypeDTO> {
    try {
      const payCodeType = await this.model.findById({ _id });
      this.checkPayCodeType(payCodeType);
      if (dto.name) payCodeType.name = dto.name;
      if (dto.type) payCodeType.type = dto.type;
      if (dto.code) payCodeType.code = dto.code;
      if (dto.overtime || dto.overtime === false) payCodeType.overtime = dto.overtime;
      if (dto.pto || dto.pto === false) payCodeType.pto = dto.pto;
      await payCodeType.save();
      // await this.historyService.create({ resource: client._id, onModel: "Client", title: serviceLog.updateClient })
      return this.sanitizer.sanitize(payCodeType);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Client already exists');
      throw e;
    }
  }

 async remove(_id: string): Promise<string> {
    const payCodeType = await this.model.findById({ _id });
    this.checkPayCodeType(payCodeType);
    await payCodeType.remove()
    return payCodeType._id;
  }

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
