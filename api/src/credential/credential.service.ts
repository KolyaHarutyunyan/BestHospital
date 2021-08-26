import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCredentialDto, CredentialDTO, UpdateCredentialDTO } from './dto';
import { ICredential } from './interface';
import { CredentialModel } from './credential.model'
import { Model } from 'mongoose';
import { Public, ParseObjectIdPipe, MongooseUtil } from '../util';
import { CredentialsStatus } from '../credential';

@Injectable()
export class CredentialService {
  constructor(
    // private readonly sanitizer: FundingSanitizer,
  ) {
    this.model = CredentialModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<ICredential>;
  private mongooseUtil: MongooseUtil;

  // create a new Credential
  async create(dto: CreateCredentialDto): Promise<CredentialDTO> {
    try {
      let credential = new this.model({
        name: dto.name,
        type: dto.type
      })

      await credential.save();
      return credential;
      // return this.sanitizer.sanitize(system);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Credential already exists');
      throw e;
    }
  }

  /** Get All Credential */
  async findAll():Promise<CredentialDTO[]> {
    try {
      const credential = await this.model.find({});
      this.checkCredential(credential[0]);
      return credential;
      // return this.sanitizer.sanitizeMany(system);
    }
    catch (e) {
      throw e
    }
  }

  /** Get Credential By Id */
  async findOne(_id): Promise<CredentialDTO> {
    try {
      const credential = await this.model.findOne({ _id });
      this.checkCredential(credential);
      return credential;
      // return this.sanitizer.sanitize(system);
    }
    catch (e) {
      throw e
    }
  }

  async update(_id: string, dto: UpdateCredentialDTO): Promise<CredentialDTO> {
    try {
      let credential = await this.model.findById({ _id })
      this.checkCredential(credential)
      if (dto.name) credential.name = dto.name;
      if (dto.type) credential.type = dto.type;
      
      await credential.save();
      return credential;
    }
    catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Credential already exists');
      throw e;
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} system`;
  // }

  /** Private methods */
  /** if the comment is not found, throws an exception */
  private checkCredential(credential: ICredential) {
    if (!credential) {
      throw new HttpException(
        'Credential was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
