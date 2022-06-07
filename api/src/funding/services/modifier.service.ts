import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModifyDTO, ServiceDTO, UpdateModifiersDto } from '../dto';
import { IModifier } from '../interface';
import { BaseService } from './base.service';

@Injectable()
export class ModifierService extends BaseService {
  /** save modifiers */
  async saveModifiers(_id: string, serviceId: string, modifier: ModifyDTO): Promise<ServiceDTO> {
    try {
      const [funder, service] = await Promise.all([
        this.model.findById({ _id }),
        this.serviceModel.findOne({ _id: serviceId }),
      ]);
      this.checkFunder(funder);
      this.checkFundingService(service);
      service.modifiers.map((dbModifier) => {
        if (dbModifier.name == modifier.name) {
          throw new HttpException('Modifier already exists', HttpStatus.BAD_REQUEST);
        }
      });
      service.modifiers.push(modifier);
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
    modifierId: string,
    dto: UpdateModifiersDto,
  ): Promise<ServiceDTO> {
    const [funder, service] = await Promise.all([
      this.model.findById({ _id }),
      this.serviceModel.findOne({ _id: serviceId }),
    ]);
    this.checkFunder(funder);
    this.checkFundingService(service);
    const dbModifier = service.modifiers as IModifier[];
    dbModifier.map((modifier) => {
      if (modifier.name == dto.modifiers.name) {
        throw new HttpException('Modifier already exists', HttpStatus.BAD_REQUEST);
      }
    });
    for (let i = 0; i < dbModifier.length; i++) {
      if (dbModifier[i]._id.toString() === modifierId.toString()) {
        dbModifier[i].credentialId = dto.modifiers.credentialId;
        dbModifier[i].chargeRate = dto.modifiers.chargeRate;
        dbModifier[i].name = dto.modifiers.name;
        dbModifier[i].type = dto.modifiers.type;
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
