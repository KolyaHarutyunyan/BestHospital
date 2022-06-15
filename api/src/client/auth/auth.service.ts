import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { FileService } from '../../files/file.service';
import { MongooseUtil } from '../../util';
import { AuthService } from '../auth-service/auth-service.service';
import { ClientModel } from '../client.model';
import { EnrollmentService } from '../enrollment';
import { IClient } from '../interface';
import { DocumentStatus } from './auth.constants';
import { ClientAuthorizationModel } from './auth.model';
import { AuthDTO, CreateAuthDTO, UpdateAuthDTO } from './dto';
import { CreateDocDTO } from './dto/create.dto';
import { AuthSanitizer } from './interceptor/auth.sanitizer';
import { IAuth, IAuthDoc } from './interface';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly authService: AuthService,
    private readonly fileService: FileService,
    private readonly sanitizer: AuthSanitizer,
  ) {
    this.model = ClientAuthorizationModel;
    this.clientModel = ClientModel;
    this.mongooseUtil = new MongooseUtil();
  }

  private model: Model<IAuth>;
  private clientModel: Model<IClient>;
  private mongooseUtil: MongooseUtil;

  /** Create a new authorization */
  create = async (clientId: string, funderId: string, dto: CreateAuthDTO): Promise<AuthDTO> => {
    try {
      this.checkTime(dto.startDate, dto.endDate);
      const [client] = await Promise.all([
        this.clientModel.findById({ _id: clientId }),
        this.enrollmentService.findByFunder(funderId),
      ]);
      this.checkClient(client);
      const auth = new this.model({
        authId: dto.authId,
        clientId: client._id,
        funderId: funderId,
        startDate: dto.startDate,
        endDate: dto.endDate,
        // status hanel
        status: dto.status,
        location: dto.location,
      });
      await auth.save();
      return this.sanitizer.sanitize(auth);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Authorization already exists');
      throw e;
    }
  };
  /** add document */
  async addDocument(_id: string, dto: CreateDocDTO): Promise<AuthDTO> {
    const document: IAuthDoc = {
      name: dto.name ? dto.name : '',
      status: DocumentStatus.ACTIVE,
      file: dto.file,
    } as IAuthDoc;
    const [auth]: any = await Promise.all([
      this.model.findById(_id),
      this.fileService.getOne(dto.file.id),
    ]);
    this.checkAuth(auth);
    auth.documents.unshift(document);
    await auth.save();
    return this.sanitizer.sanitize(auth);
  }

  /** delete document in the auth */
  async deleteDocument(_id: string, fileId: string): Promise<AuthDTO> {
    const auth = await this.model.findById(_id);
    this.checkAuth(auth);
    await this.removeFromList(auth.documents, fileId);
    await auth.save();
    return this.sanitizer.sanitize(auth);
  }
  /** update document name */
  async updateDocument(_id: string, fileId: string, name: string): Promise<AuthDTO> {
    const auth = await this.model.findById(_id);
    this.checkAuth(auth);
    auth.documents.map((file: any) => {
      if (file._id == fileId) {
        file.name = name;
      }
    });
    await auth.save();
    return this.sanitizer.sanitize(auth);
  }
  // update the authorization
  async update(_id: string, dto: UpdateAuthDTO): Promise<AuthDTO> {
    try {
      const auth = await this.model.findById({ _id });
      this.checkAuth(auth);
      if (dto.startDate) auth.startDate = dto.startDate;
      if (dto.endDate) auth.endDate = dto.endDate;
      if (dto.authId) auth.authId = dto.authId;
      if (dto.status) auth.status = dto.status;
      if (dto.location) auth.location = dto.location;
      await auth.save();
      return this.sanitizer.sanitize(auth);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Authorization already exists');
      throw e;
    }
  }

  // find authorizations
  async findAll(clientId: string): Promise<AuthDTO[]> {
    try {
      const auths = await this.model
        .find({ clientId })
        .populate({ path: 'funderId', select: 'name' });
      return this.sanitizer.sanitizeMany(auths);
    } catch (e) {
      throw e;
    }
  }

  //remove authorization
  // async remove(_id: string): Promise<string> {
  //   const auth = await this.model.findById({ _id });
  //   this.checkAuth(auth);
  //   auth.remove();
  //   return auth._id;
  // }

  /** Private methods */
  /** if the client is not found, throws an exception */
  private checkClient(client: IClient) {
    if (!client) {
      throw new HttpException('Client with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
  /** if the authorization is not found, throws an exception */
  private checkAuth(auth: IAuth) {
    if (!auth) {
      throw new HttpException('Authorization with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
  /** Removes a file from the list if the file exists */
  private async removeFromList(list: any[], element: any) {
    const index = list.findIndex((file) => file._id == element);
    if (index !== -1) {
      await this.fileService.deleteImages(list[index].file.id);
      list.splice(index, 1);
    } else {
      throw new HttpException('Was not found in list', HttpStatus.NOT_FOUND);
    }
  }
  /** check dates */
  private checkTime(start: Date, end: Date) {
    if (new Date(start) > new Date(end)) {
      throw new HttpException('End date should be greater than start date', HttpStatus.BAD_REQUEST);
    }
  }
}
