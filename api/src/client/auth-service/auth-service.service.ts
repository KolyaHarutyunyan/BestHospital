import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ModifyDTO } from '../../funding/dto';
import { Service } from '../../funding/services/service';
import { MongooseUtil } from '../../util';
import { ClientAuthorizationModel } from '../auth/auth.model';
import { IAuth } from '../auth/interface';
import { ClientAuthServiceModel } from './auth-service.model';
import { AuthServiceDTO, CreateAuthServiceDTO, UpdateAuthServiceDTO } from './dto';
import { AuthServiceSanitizer } from './interceptor/auth-service.interceptor';
import { IAuthService } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly sanitizer: AuthServiceSanitizer,
    private readonly fundingService: Service,
  ) {
    this.model = ClientAuthServiceModel;
    this.authModel = ClientAuthorizationModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IAuthService>;
  private authModel: Model<IAuth>;
  private mongooseUtil: MongooseUtil;

  // check if modifiers are received
  async checkModifiers(authId: string, fundingServiceId: string): Promise<ModifyDTO> {
    try {
      const findService = await this.fundingService.findService(fundingServiceId);
      return await this.availableModifiers(authId, findService);
    } catch (e) {
      throw e;
    }
  }

  // create authorization service
  async create(
    authorizationId: string,
    fundingServiceId: string,
    dto: CreateAuthServiceDTO,
  ): Promise<AuthServiceDTO> {
    try {
      const modifiers = [];
      const brokenModifiers = [];
      let compareByFundingService;
      const findService = await this.fundingService.findService(fundingServiceId);
      if (dto.modifiers) {
        await this.compareModifiersByAuthService(
          authorizationId,
          fundingServiceId,
          dto,
          brokenModifiers,
        );
        compareByFundingService = await this.compareModifiersByFundingService(
          dto,
          findService,
          modifiers,
        );
      }
      const authorizationService = new this.model({
        total: dto.total,
        authorizationId: authorizationId,
        serviceId: fundingServiceId,
        modifiers: compareByFundingService || [],
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
  async compareModifiersByAuthService(
    authorizationId: string,
    fundingServiceId: string,
    dto,
    brokenModifiers: string[],
  ): Promise<void> {
    const findAuthorizationService: any = await this.model
      .find({ authorizationId: authorizationId })
      .populate('serviceId');
    findAuthorizationService.map((authService) => {
      dto.modifiers.map((dtoModifier) => {
        if (authService.modifiers.some((e) => e._id == dtoModifier)) {
          brokenModifiers.push(dtoModifier);
          brokenModifiers = [...new Set(brokenModifiers)];
        }
      });
    });
    if (brokenModifiers.length) {
      throw new HttpException(`Modifier received ${brokenModifiers}`, HttpStatus.BAD_REQUEST);
    }
  }

  // check if modifiers match to the fundingService only for create function
  async compareModifiersByFundingService(dto, findService, modifiers): Promise<ModifyDTO> {
    findService.modifiers.map((serviceModifier) => {
      dto.modifiers.map((dtoModifier) => {
        if (serviceModifier._id == dtoModifier) {
          modifiers.push(serviceModifier);
        }
      });
    });
    if (dto.modifiers.length > modifiers.length) {
      throw new HttpException(
        `Modifiers does not belong to fundingService`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return modifiers;
  }

  /** get available modifiers only for checkModifiers function */
  async availableModifiers(authId: string, fundingService: any): Promise<any> {
    const dbModifiers = [],
      available = [];
    const authServices = await this.model.find({ authId });
    // this.checkAuthorizationService(authServices[0]);
    authServices.map((authService) => {
      authService.modifiers.map((modifier) => {
        dbModifiers.push(modifier);
      });
    });

    if (dbModifiers.length) {
      fundingService.modifiers.map((modifier) => {
        if (
          dbModifiers.findIndex(
            (innerModifier) => innerModifier._id.toString() === modifier._id.toString(),
          ) === -1
        ) {
          available.push(modifier);
        }
      });
    }
    return available;
  }

  // find all authorization services
  async findAll(authId: string): Promise<AuthServiceDTO[]> {
    try {
      const authService = await this.model.find({ authId }).populate('serviceId');
      return this.sanitizer.sanitizeMany(authService);
    } catch (e) {
      throw e;
    }
  }

  // find all authorization services by multi authorizationId
  async findAllByAuthorizations(authIds: Array<string>): Promise<AuthServiceDTO[]> {
    try {
      const authServices = await this.model.find({
        authorizationId: { $in: authIds },
      });
      return this.sanitizer.sanitizeMany(authServices);
    } catch (e) {
      throw e;
    }
  }

  // find authorization service by id
  async findById(authServiceId: string): Promise<AuthServiceDTO> {
    const authService = await this.model
      .findById({ _id: authServiceId })
      .populate('authorizationId');
    this.checkAuthService(authService);
    return this.sanitizer.sanitize(authService);
  }

  // update authorization service
  async update(_id: string, dto: UpdateAuthServiceDTO): Promise<AuthServiceDTO> {
    try {
      const authService = await this.model.findById({
        _id,
        authorizationId: dto.authorizationId,
      });
      this.checkAuthService(authService);
      const auth = await this.authModel.findOne({ _id: dto.authorizationId });
      this.checkAuth(auth);
      const fundingService: any = await this.fundingService.findAllServiceForClient(
        auth.funderId,
        dto.fundingServiceId,
      );
      if (!fundingService.length) {
        throw new HttpException('Invalid fundingServiceId', HttpStatus.NOT_FOUND);
      }
      if (dto.total) {
        authService.total = dto.total;
      }
      await authService.save();
      return this.sanitizer.sanitize(authService);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Authorization Service already exists');
      throw e;
    }
  }

  // remove the authorization service
  async remove(_id: string): Promise<string> {
    try {
      const authService = await this.model.findByIdAndDelete({ _id });
      this.checkAuthService(authService);
      return authService._id;
    } catch (e) {
      throw e;
    }
  }

  // get by funding service id
  async getByServiceId(serviceId: string) {
    try {
      const authService = await this.model.findOne({ serviceId }).populate('authorizationId');
      this.checkAuthService(authService);
      return authService;
    } catch (e) {
      throw e;
    }
  }

  async countCompletedUnits(_id: string, minutes: number) {
    const authService: any = await this.model.findById(_id).populate('serviceId');
    this.checkAuthService(authService);
    const size = authService.serviceId.size;
    const completedUnits = minutes / size;

    authService.completed += Math.floor(completedUnits);
    // authService.available = Math.floor(authService.total - authService.completed)
    await authService.save();
  }

  /** Private methods */
  /** if the contact is not found, throws an exception */
  private checkAuth(auth: IAuth) {
    if (!auth) {
      throw new HttpException('Authorization with this id was not found', HttpStatus.NOT_FOUND);
    }
  }

  private checkAuthService(authService: IAuthService) {
    if (!authService) {
      throw new HttpException(
        'Authorization Service with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
