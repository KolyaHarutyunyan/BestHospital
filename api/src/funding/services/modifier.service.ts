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

  /** delete modifiers */
  async deleteModifiers(_id: string, serviceId: string, ids: any): Promise<ServiceDTO> {
    const [funder, service] = await Promise.all([
      this.model.findById({ _id }),
      this.serviceModel.findOne({ _id: serviceId }),
    ]);
    this.checkFunder(funder);
    this.checkFundingService(service);
    typeof ids === 'string' ? (ids = ids.split(' ')) : null;
    service.modifiers.map((dbModifier) => {
      ids.map((dtoModifier) => {
        if (dtoModifier == dbModifier._id) {
          dbModifier.status = false;
        }
      });
    });
    return await service.save();
  }
}
