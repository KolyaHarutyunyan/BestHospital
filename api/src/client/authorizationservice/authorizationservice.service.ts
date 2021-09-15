import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MongooseUtil } from '../../util';
import { AuthorizationServiceSanitizer } from './interceptor/authorizationService.interceptor';
import { AuthorizationServiceDTO, CreateAuthorizationServiceDTO, UpdateAuthorizationserviceDTO, AuthorizationModifiersDTO } from './dto';
import { Model } from 'mongoose';
import { IAuthorizationService } from './interface';
import { IAuthorization } from '../authorization/interface';
import { ClientAuthorizationServiceModel } from './authorizationService.model';
import { ClientAuthorizationModel } from '../authorization/authorization.model';
import { FundingService } from '../../funding';
import { ModifierService } from '../../funding/modifier/modifier.service';

@Injectable()
export class AuthorizationserviceService {
  constructor(
    private readonly sanitizer: AuthorizationServiceSanitizer,
    private readonly fundingService: FundingService,
    private readonly modifierService: ModifierService,

  ) {
    this.model = ClientAuthorizationServiceModel;
    this.authorizationModel = ClientAuthorizationModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IAuthorizationService>;
  private authorizationModel: Model<IAuthorization>;
  private mongooseUtil: MongooseUtil;
  
  async checkModifiers(authorizationId: string, fundingServiceId: string, dto: AuthorizationModifiersDTO): Promise<any> {
    try{
      let modifiers = [];
      let brokenModifiers = [];

      if (dto.modifiers) {
        const findAuthorizationService: any = await this.model.find({ authorizationId: authorizationId, serviceId: fundingServiceId }).populate('modifiers');
        if (findAuthorizationService) {
          findAuthorizationService.forEach(item => {
            item.modifiers.map(modifier => {
              modifiers.push(modifier._id)
            })
          })
          let dtoM = dto.modifiers;
          for (let i = 0; i < dtoM.length; i++) {
            for (let j = 0; j < modifiers.length; j++) {
              if (dtoM[i] == modifiers[j]) {
                brokenModifiers.push(dtoM[i])
              }
            }
          }
          if(brokenModifiers.length !== 0){
            throw new HttpException(
              `Modifier received ${brokenModifiers}`,
              HttpStatus.NOT_FOUND,
            );
          }
          return new HttpException('modifiers are free', HttpStatus.ACCEPTED)
        }
        throw new HttpException(
          `authorization services not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        `modifiers was not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    catch(e){
      throw e
    }
  }


  async create(authorizationId: string, fundingServiceId: string, dto: CreateAuthorizationServiceDTO): Promise<AuthorizationServiceDTO> {
    try {
      let modifiers = [];
      let brokenModifiers = [];

      if (dto.modifiers) {
        const findAuthorizationService: any = await this.model.find({ authorizationId: authorizationId, serviceId: fundingServiceId }).populate('modifiers');
        if (findAuthorizationService) {
          findAuthorizationService.forEach(item => {
            item.modifiers.map(modifier => {
              modifiers.push(modifier._id)
            })
          })
          let dtoM = dto.modifiers;
          for (let i = 0; i < dtoM.length; i++) {
            for (let j = 0; j < modifiers.length; j++) {
              if (dtoM[i] == modifiers[j]) {
                brokenModifiers.push(dtoM[i])
              }
            }
          }
          if(brokenModifiers.length !== 0){
            throw new HttpException(
              `Modifier received ${brokenModifiers}`,
              HttpStatus.NOT_FOUND,
            );
          }
          modifiers = [];
        }
      }

      const authorization = await this.authorizationModel.findOne({ _id: authorizationId });
      this.checkAuthorization(authorization);
      const findModifiers: any = await this.modifierService.findByServiceId(fundingServiceId);
      // if (!fundingService.length) {
      //   throw new HttpException(
      //     'Invalid fundingServiceId',
      //     HttpStatus.NOT_FOUND,
      //   );
      // }

      if (dto.modifiers && findModifiers[0].length == []) {
        throw new HttpException(
          'Current Funding service has not modifier',
          HttpStatus.NOT_FOUND,
        );
      }

      if (dto.modifiers && findModifiers[0].length != []) {
        findModifiers.map(modifier => modifiers.push(modifier.id))
        dto.modifiers.map(modifier => {
          if (!modifiers.includes(modifier)) {
            throw new HttpException(
              'Invalid modifier',
              HttpStatus.NOT_FOUND,
            );
          }
        })
      }

      else {
        throw new HttpException(
          'Incorrect modifier',
          HttpStatus.NOT_FOUND,
        );
      }

      let authorizationService = new this.model({
        total: dto.total,
        // completed: dto.completed,
        // available: dto.available,
        authorizationId: authorization.id,
        serviceId: fundingServiceId,
        modifiers: dto.modifiers
      });
      await authorizationService.save();
      return this.sanitizer.sanitize(authorizationService);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Authorization Service already exists');
      throw e;
    }
  }

  async findAll(authorizationId: string): Promise<AuthorizationServiceDTO[]> {
    try {
      const authorizationService = await this.model.find({ authorizationId }).populate('modifiers').populate('serviceId');
      this.checkAuthorizationService(authorizationService[0]);
      return this.sanitizer.sanitizeMany(authorizationService);
    } catch (e) {
      throw e;
    }
  }

  async update(_id: string, dto: UpdateAuthorizationserviceDTO): Promise<AuthorizationServiceDTO> {
    try {
      const modifiers = [];
      const authorizationService = await this.model.findById({ _id, authorizationId: dto.authorizationId });
      this.checkAuthorizationService(authorizationService)
      const authorization = await this.authorizationModel.findOne({ _id: dto.authorizationId });
      this.checkAuthorization(authorization);

      const fundingService: any = await this.fundingService.findAllServiceForClient(authorization.funderId, dto.fundingServiceId);
      if (!fundingService.length) {
        throw new HttpException(
          'Invalid fundingServiceId',
          HttpStatus.NOT_FOUND,
        );
      }

      // if (dto.modifiers && fundingService[0].modifiers.length != []) {    
      //   fundingService[0].modifiers.map(modifier => modifiers.push(modifier.id));
      //    dto.modifiers.map(modifier => {
      //     if (!modifiers.includes(modifier)) {
      //       throw new HttpException(
      //         'Invalid modifier',
      //         HttpStatus.NOT_FOUND,
      //       );
      //     }
      //   })
      //   authorizationService.modifiers = dto.modifiers;
      //   authorizationService.serviceId = dto.fundingServiceId;
      // }


      // if (dto.available) {
      //   authorizationService.available = dto.available;
      // }
      // if (dto.completed) {
      //   authorizationService.completed = dto.completed;
      // }
      if (dto.total) {
        authorizationService.total = dto.total;
      }

      await authorizationService.save()

      return this.sanitizer.sanitize(authorizationService);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Authorization Service already exists');
      throw e;
    }
  }

  async remove(_id: string) {
    try {
      const authorizationService = await this.model.findByIdAndDelete({ _id });
      this.checkAuthorizationService(authorizationService);
      return authorizationService._id;
    }
    catch (e) {
      throw e
    }
  }

  /** if the contact is not found, throws an exception */
  private checkAuthorization(authorization: IAuthorization) {
    if (!authorization) {
      throw new HttpException(
        'Authorization with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  private checkAuthorizationService(authorizationService: IAuthorizationService) {
    if (!authorizationService) {
      throw new HttpException(
        'Authorization Service with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

