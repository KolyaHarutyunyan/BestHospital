import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';
import { MongooseUtil } from '../../util/mongoose.util';
import { CreateModifierDto, CreateModifiersDTO, UpdateModifierDto, ModifyDTO } from './dto';
import { ModifyModel } from './modifier.model';
import { FundingService } from '../funding.service';
import { CredentialService } from '../../credential/credential.service';
import { IModify } from './interface/modify.interface';
import { ModifySanitizer } from './interceptor/modifier.interceptor';

@Injectable()
export class ModifierService {
  constructor(
    private readonly fundingService: FundingService,
    private readonly credentialService: CredentialService,
    private readonly sanitizer: ModifySanitizer,
    // private readonly sanitizer: ModifierSanitizer,
  ) {
    this.model = ModifyModel;
    this.mongooseUtil = new MongooseUtil();
  }

  private model: Model<any>;

  private mongooseUtil: MongooseUtil;
  
  async create(dto: CreateModifiersDTO): Promise<ModifyDTO[]> {
    try {
      const credentials = [];
      const fundingService = await this.fundingService.findService(dto.serviceId);
      dto.modifiers.map(modifier => {
        credentials.push(modifier.credentialId)
        modifier.serviceId = fundingService._id;
      })
      const credential = await this.credentialService.findAllByIds(credentials);
      if(credentials.length !== credential.length){
        throw new HttpException(
          'Credential was not found',
          HttpStatus.NOT_FOUND)
      }
      const modifiers = await this.model.collection.insertMany(dto.modifiers);
      return modifiers.ops
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Modifier already exists');
      throw e;
    }
  }
  async findByServiceId(fundingServiceId: string): Promise<ModifyDTO[]> {
    const modifiers = await this.model.find({ serviceId: fundingServiceId });
    this.checkModify(modifiers[0]);
    return this.sanitizer.sanitizeMany(modifiers);
  }
  // findAll() {
  //   return `This action returns all modifier`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} modifier`;
  // }

  async update(_id: string, dto: UpdateModifierDto): Promise<any> {
    try {
      const modifier = await this.model.findById({ _id });
      this.checkModify(modifier);
      if (dto.chargeRate) modifier.chargeRate = dto.chargeRate;
      if (dto.name) modifier.name = dto.name;
      if (dto.type || dto.type === 0) modifier.type = dto.type;
      if (dto.credentialId) {
        const credential = await this.credentialService.findOne(dto.credentialId);
        modifier.credentialId = dto.credentialId
      }
      if (dto.fundingServiceId) {
        const fundingService = await this.fundingService.findService(dto.fundingServiceId)
        modifier.serviceId = dto.fundingServiceId
      }
      await modifier.save()
      return this.sanitizer.sanitize(modifier)
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Modifier already exists');
      throw e;
    }
  }

  async remove(_id: string): Promise<string> {
    const modifier = await this.model.findByIdAndDelete({ _id });
    this.checkModify(modifier);
    return modifier._id;
  }

  /** Private methods */
  /** if the modifier is not found, throws an exception */
  private checkModify(modify: IModify) {
    if (!modify) {
      throw new HttpException(
        'Modifier was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
