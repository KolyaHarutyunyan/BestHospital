import { Injectable } from '@nestjs/common';
import { IModifier } from '../interface';
import { ModifyDTO, UpdateModifiersDto, ServiceDTO } from '../dto';
import { BaseService } from './base.service';

@Injectable()
export class ModifierService extends BaseService {
  /** save modifiers */
  async saveModifiers(_id: string, serviceId: string, modifiers: ModifyDTO[]): Promise<ServiceDTO> {
    const [funder, service] = await Promise.all([
      this.model.findById({ _id }),
      this.serviceModel.findOne({ _id: serviceId }),
    ]);
    this.checkFunder(funder);
    this.checkFundingService(service);
    modifiers.map((modifier) => {
      service.modifiers.push(modifier);
    });
    return await service.save();
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
          dbModifier[i].name = dto.modifiers[j].name;
          dbModifier[i].type = dto.modifiers[j].type;
        }
      }
    }
    return await service.save();
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
    return await service.save();
  }
  /** set modifier inactive*/
  async inactive(_id: string, serviceId: string, modifierId: string): Promise<ServiceDTO> {
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
    return await service.save();
  }
}
