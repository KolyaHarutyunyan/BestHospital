import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ModifyDTO } from '../../funding/modifier/dto';
import { FundingService } from '../../funding';
import { MongooseUtil } from '../../util';
import { ClientAuthorizationModel } from '../authorization/authorization.model';
import { IAuthorization } from '../authorization/interface';
import { ClientAuthorizationServiceModel } from './authorizationService.model';
import { AuthorizationModifiersDTO, AuthorizationServiceDTO, CreateAuthorizationServiceDTO, UpdateAuthorizationserviceDTO } from './dto';
import { AuthorizationServiceSanitizer } from './interceptor/authorizationService.interceptor';
import { IAuthorizationService } from './interface';

@Injectable()
export class AuthorizationserviceService {
  constructor(
    private readonly sanitizer: AuthorizationServiceSanitizer,
    private readonly fundingService: FundingService,

  ) {
    this.model = ClientAuthorizationServiceModel;
    this.authorizationModel = ClientAuthorizationModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IAuthorizationService>;
  private authorizationModel: Model<IAuthorization>;
  private mongooseUtil: MongooseUtil;

  // check if modifiers are received
  async checkModifiers(authorizationId: string, fundingServiceId: string, dto: AuthorizationModifiersDTO): Promise<ModifyDTO> {
    try {
      const findService = await this.fundingService.findService(fundingServiceId);
      return await this.availableModifiers(authorizationId, findService);
    }
    catch (e) {
      throw e
    }
  }

  // create authorization service
  async create(authorizationId: string, fundingServiceId: string, dto: CreateAuthorizationServiceDTO): Promise<AuthorizationServiceDTO> {
    try {
      let modifiers = [];
      let brokenModifiers = [];
      let compareByFundingService;
      const findService = await this.fundingService.findService(fundingServiceId);
      if (dto.modifiers) {
        await this.compareModifiersByAuthService(authorizationId, fundingServiceId, dto, brokenModifiers);
        compareByFundingService = await this.compareModifiersByFundingService(dto, findService, modifiers);
      }
      let authorizationService = new this.model({
        total: dto.total,
        authorizationId: authorizationId,
        serviceId: fundingServiceId,
        modifiers: compareByFundingService || []
      });
      await authorizationService.save();
      return this.sanitizer.sanitize(authorizationService);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Authorization Service already exists');
      throw e;
    }
  }

  // check if modifiers received only for create function
  async compareModifiersByAuthService(authorizationId: string, fundingServiceId: string, dto, brokenModifiers: String[]): Promise<void> {
    const findAuthorizationService: any = await this.model.find({ authorizationId: authorizationId }).populate('serviceId');
    findAuthorizationService.map(authService => {
      dto.modifiers.map(dtoModifier => {
        if (authService.modifiers.some(e => e._id == dtoModifier)) {
          brokenModifiers.push(dtoModifier);
          brokenModifiers = [...new Set(brokenModifiers)];
        }
      })
    })
    if (brokenModifiers.length) {
      throw new HttpException(
        `Modifier received ${brokenModifiers}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // check if modifiers match to the fundingService only for create function
  async compareModifiersByFundingService(dto, findService, modifiers): Promise<ModifyDTO> {
    findService.modifiers.map(serviceModifier => {
      dto.modifiers.map(dtoModifier => {
        if (serviceModifier._id == dtoModifier) {
          modifiers.push(serviceModifier);
        }
      })
    })
    if (dto.modifiers.length > modifiers.length) {
      throw new HttpException(
        `Modifiers does not belong to fundingService`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return modifiers;
  }

  /** get available modifiers only for checkModifiers function */
  async availableModifiers(authorizationId: string, fundingService: any): Promise<any> {
    let dbModifiers = [];
    let available = [];
    const authServices: any = await this.model.find({ authorizationId });
    this.checkAuthorizationService(authServices[0]);
    authServices.map(authService => { 
      authService.modifiers.map(modifier =>{
        dbModifiers.push(modifier._id.toString())
      })
    })
    if(dbModifiers.length){
      fundingService.modifiers.map(modifier =>{
        if(dbModifiers.indexOf(modifier._id.toString()) === -1){
          available.push(modifier)
        }
      })
      return available;
    }
    return fundingService.modifiers;
  }

  // find all authorization services
  async findAll(authorizationId: string): Promise<AuthorizationServiceDTO[]> {
    try {
      const authorizationService = await this.model.find({ authorizationId }).populate('serviceId');
      this.checkAuthorizationService(authorizationService[0]);
      return this.sanitizer.sanitizeMany(authorizationService);
    } catch (e) {
      throw e;
    }
  }

  // find all authorization services by multi authorizationId
  async findAllByAuthorizations(authorizationIds: Array<string>): Promise<AuthorizationServiceDTO[]> {
    try {
      const authorizationServices = await this.model.find({ authorizationId: { $in: authorizationIds } });
      // this.checkAuthorizationService(authorizationServices[0]);
      return this.sanitizer.sanitizeMany(authorizationServices);
    } catch (e) {
      throw e;
    }
  }

  // find authorization service by id
  async findById(authServiceId: string): Promise<AuthorizationServiceDTO> {
    const authorizationService = await this.model.findById({ _id: authServiceId }).populate("authorizationId");
    this.checkAuthorizationService(authorizationService);
    return this.sanitizer.sanitize(authorizationService);
  }

  // update authorization service
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

  // remove the authorization service
  async remove(_id: string): Promise<String> {
    try {
      const authorizationService = await this.model.findByIdAndDelete({ _id });
      this.checkAuthorizationService(authorizationService);
      return authorizationService._id;
    }
    catch (e) {
      throw e
    }
  }

  // get by funding service id
  async getByServiceId(serviceId: string) {
    try {
      const authorizationService = await this.model.findOne({ serviceId }).populate("authorizationId");
      this.checkAuthorizationService(authorizationService);
      return authorizationService;
    }
    catch (e) {
      throw e
    }
  }

  async countCompletedUnits(_id: string, minutes: number) {
    const authService: any = await this.model.findById(_id).populate('serviceId');
    this.checkAuthorizationService(authService);
    const size = authService.serviceId.size;
    const completedUnits = minutes / size;

    authService.completed += Math.floor(completedUnits);
    // authService.available = Math.floor(authService.total - authService.completed)
    await authService.save();
  }

  /** Private methods */
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

