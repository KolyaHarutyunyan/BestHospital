import { Injectable } from '@nestjs/common';
import { ModifyDTO, ServiceDTO, UpdateModifiersDto } from '../dto';
import { IModifier } from '../interface';
import { BaseService } from './base.service';

@Injectable()
export class ModifierService extends BaseService {
  /** save modifiers */
  async saveModifiers(_id: string, serviceId: string, modifiers: ModifyDTO[]): Promise<ServiceDTO> {
    try {
      const [funder, service] = await Promise.all([
        this.model.findById({ _id }),
        this.serviceModel.findOne({ _id: serviceId }),
      ]);
      this.checkFunder(funder);
      this.checkFundingService(service);
      modifiers.map((modifier) => {
        service.modifiers.push(modifier);
      });
      await service.save();
      return this.sanitizer.serviceSanitize(service);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Service already exists');
      throw e;
    }
  }

  /** update modifiers */
  async updateModifiers(
    _id: string,
    serviceId: string,
    dto: UpdateModifiersDto,
  ): Promise<ServiceDTO> {
    const [funder, service] = await Promise.all([
      this.model.findById({ _id }),
      this.serviceModel.findOne({ _id: serviceId }),
    ]);
    this.checkFunder(funder);
    this.checkFundingService(service);
    const dbModifier = service.modifiers as IModifier[];
    for (let i = 0; i < dbModifier.length; i++) {
      for (let j = 0; j < dto.modifiers.length; j++) {
        if (dto.modifiers[j]._id == dbModifier[i]._id) {
          dbModifier[i].credentialId = dto.modifiers[j].credentialId;
          dbModifier[i].chargeRate = dto.modifiers[j].chargeRate;
          dbModifier[i].name = dto.modifiers[j].name;
          dbModifier[i].type = dto.modifiers[j].type;
        }
      }
    }
    await service.save();
    return this.sanitizer.serviceSanitize(service);
  }
  /** set modifier to active */
  async active(_id: string, serviceId: string, modifierId: string): Promise<ServiceDTO> {
    const [funder, service] = await Promise.all([
      this.model.findById({ _id }),
      this.serviceModel.findOne({ _id: serviceId }),
    ]);
    this.checkFunder(funder);
    this.checkFundingService(service);
    service.modifiers.map((modifier) => {
      if (modifier._id.toString() === modifierId.toString()) {
        modifier.status = true;
      }
    });
    await service.save();
    return this.sanitizer.serviceSanitize(service);
  }
  /** set modifier inactive*/
  async inactive(_id: string, serviceId: string, modifierId: string): Promise<ServiceDTO> {
    // Inactive modifiers cannot be used in new authorizations
    const [funder, service] = await Promise.all([
      this.model.findById({ _id }),
      this.serviceModel.findOne({ _id: serviceId }),
    ]);
    this.checkFunder(funder);
    this.checkFundingService(service);
    service.modifiers.map((modifier) => {
      if (modifier._id.toString() === modifierId.toString()) {
        modifier.status = false;
      }
    });
    await service.save();
    return this.sanitizer.serviceSanitize(service);
  }
}
