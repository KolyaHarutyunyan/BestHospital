import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';
import { MongooseUtil } from '../../util/mongoose.util';
import { CreateModifierDto, CreateModifiersDTO, UpdateModifierDto, ModifyDTO, UpdateModifiersDto } from './dto';
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
      const modifiers: any = await this.model.findOne({ serviceId: fundingService._id })
      dto.modifiers.map(modifier => {
        credentials.indexOf(modifier.credentialId) === -1 ? credentials.push(modifier.credentialId) : null
      })
      const credential = await this.credentialService.findAllByIds(credentials);
      if (credentials.length !== credential.length) {
        throw new HttpException(
          'Credential was not found',
          HttpStatus.NOT_FOUND)
      }
      if (modifiers) {
        dto.modifiers.map(modifier => {
          modifiers.modifiers.push(modifier)
        })
        await modifiers.save()
        return modifiers
      }
      const modifier = new this.model({
        serviceId: dto.serviceId,
        modifiers: dto.modifiers
      })
      await modifier.save()
      return modifier
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Modifier already exists');
      throw e;
    }
  }
  async findByServiceId(fundingServiceId: string): Promise<ModifyDTO[]> {
    const modifiers = await this.model.find({ serviceId: fundingServiceId });
    this.checkModify(modifiers[0]);
    return modifiers
    // return this.sanitizer.sanitizeMany(modifiers);
  }

  async update(_id: string, dto: UpdateModifiersDto): Promise<any> {
    try {
      const credentials = [];
      const modifier: any = await this.model.findById(_id);
      this.checkModify(modifier);
      dto.modifiers.map(modifier => {
       credentials.indexOf(modifier.credentialId) === -1 ? credentials.push(modifier.credentialId) : null
      })
      const credential = await this.credentialService.findAllByIds(credentials);
      if (credentials.length !== credential.length) {
        throw new HttpException(
          'Credential was not found',
          HttpStatus.NOT_FOUND)
      }
      modifier.modifiers = dto.modifiers;
      await modifier.save()
      return modifier
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
