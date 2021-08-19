import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthorizationDTO, CreateAuthorizationDTO, UpdateAuthorizationDTO } from './dto';
import { IClient } from '../../client/interface';
import { IAuthorization } from './interface';
import { MongooseUtil } from '../../util';
import { Model } from 'mongoose';
import { FundingService } from '../../funding';
import { AddressService } from '../../address';
import { AuthorizationSanitizer } from './interceptor/authorization.sanitizer';
import { ClientAuthorizationModel } from './authorization.model';
import { ClientModel } from '../client.model';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly fundingService: FundingService,
    private readonly addressService: AddressService,

    private readonly sanitizer: AuthorizationSanitizer,

  ) {
    this.model = ClientAuthorizationModel;
    this.clientModel = ClientModel;
    this.mongooseUtil = new MongooseUtil();
  }

  private model: Model<IAuthorization>;
  private clientModel: Model<IClient>;


  private mongooseUtil: MongooseUtil;

  /** Create a new authorization */
  create = async (clientId: string, funderId: string, dto: CreateAuthorizationDTO): Promise<AuthorizationDTO> => {
    try {
      const client = await this.clientModel.findById({ _id: clientId });
      this.checkClient(client);

      const funder = await this.fundingService.findOne(funderId);

      let authorization = new this.model({
        authId: dto.authId,
        clientId: client._id,
        funderId: funder.id,
        startDate: dto.startDate,
        endDate: dto.endDate,
        address: await this.addressService.getAddress(dto.address),
      });

      await authorization.save();
      return this.sanitizer.sanitize(authorization);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Authorization already exists');
      throw e;
    }
  }
  // update the authorization
  async update(_id: string, dto: UpdateAuthorizationDTO): Promise<AuthorizationDTO> {
    try {
      const authorization = await this.model.findById({ _id });
      this.checkAuthorization(authorization)
      if (dto.startDate) authorization.startDate = dto.startDate;
      if (dto.endDate) authorization.endDate = dto.endDate;
      if (dto.authId) authorization.authId = dto.authId
      if (dto.status) authorization.status = dto.status;
      if (dto.address) authorization.address = await this.addressService.getAddress(dto.address);
      await authorization.save()
      return this.sanitizer.sanitize(authorization);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Authorization already exists');
      throw e;
    }
  }
  async findAll(clientId: string): Promise<AuthorizationDTO[]> {
    try {
      const authorizations = await this.model.find({ clientId }).populate({ path: 'funderId', select: "name" });
      this.checkAuthorization(authorizations[0])
      return this.sanitizer.sanitizeMany(authorizations);
    }
    catch (e) {
      throw e
    }
  }

  async remove(_id: string): Promise<string> {
    const authorization = await this.model.findById({ _id });
    this.checkAuthorization(authorization);
    authorization.remove();
    return authorization._id;
  }

  /** if the client is not found, throws an exception */
  private checkClient(client: IClient) {
    if (!client) {
      throw new HttpException(
        'Client with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /** if the authorization is not found, throws an exception */
  private checkAuthorization(authorization: IAuthorization) {
    if (!authorization) {
      throw new HttpException(
        'Authorization with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

}
