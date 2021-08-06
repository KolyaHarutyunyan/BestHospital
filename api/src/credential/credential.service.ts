import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
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
  async create(dto: CreateCredentialDto) {
    try {
      let credential = new this.model({
        name: dto.name,
        type: dto.type
      })

      await credential.save();
      return credential;
      // return this.sanitizer.sanitize(credential);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Credential already exists');
      throw e;
    }
  }

  /** Get All Credential */
  async findAll() {
    try {
      const credential = await this.model.find({});
      this.checkCredential(credential[0]);
      return credential;
      // return this.sanitizer.sanitizeMany(credential);
    }
    catch (e) {
      throw e
    }
  }

  /** Get Credential By Id */
  async findOne(_id): Promise<ICredential> {
    try {
      const credential = await this.model.findOne({ _id });
      this.checkCredential(credential);
      return credential;
      // return this.sanitizer.sanitize(credential);
    }
    catch (e) {
      throw e
    }
  }


  // update(id: number, updateCredentialDto: UpdateCredentialDto) {
  //   return `This action updates a #${id} credential`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} credential`;
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
