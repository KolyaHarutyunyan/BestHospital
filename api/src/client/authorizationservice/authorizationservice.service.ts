import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MongooseUtil } from '../../util';
import { AuthorizationServiceSanitizer } from './interceptor/authorizationService.interceptor';
import { AuthorizationServiceDTO, CreateAuthorizationServiceDTO } from './dto';
import { Model } from 'mongoose';
import { IAuthorizationService } from './interface';
import { IAuthorization } from '../authorization/interface';
import { ClientAuthorizationServiceModel } from './authorizationService.model';
import { ClientAuthorizationModel } from '../authorization/authorization.model';
import { FundingService } from '../../funding';


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
  async create(authorizationId: string, fundingServiceId: string, dto: CreateAuthorizationServiceDTO) {
    try {
      const modifiers = [];
      const authorization = await this.authorizationModel.findOne({ _id: authorizationId });
      this.checkAuthorization(authorization);
      const fundingService = await this.fundingService.findOneService(fundingServiceId);
      if (fundingService.modifiers.length != []) {
        fundingService.modifiers.map(modifier => modifiers.push(modifier.name))
      }
      let authorizationService = new this.model({
        total: dto.total,
        completed: dto.completed,
        available: dto.available,
        authorizationId: authorization.id,
        serviceId: fundingService.id,
        modifiers
      });
      await authorizationService.save();
      return this.sanitizer.sanitize(authorizationService);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Authorization Service already exists');
      throw e;
    }
  }

//   findAll() {
//     return `This action returns all authorizationservice`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} authorizationservice`;
//   }

//   // update(id: number, updateAuthorizationserviceDto: UpdateAuthorizationserviceDto) {
//     return `This action updates a #${id} authorizationservice`;
//   }

// remove(id: number) {
//   return `This action removes a #${id} authorizationservice`;
// }
  /** if the contact is not found, throws an exception */
  private checkAuthorization(authorization: IAuthorization) {
    if (!authorization) {
      throw new HttpException(
        'Profile with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
