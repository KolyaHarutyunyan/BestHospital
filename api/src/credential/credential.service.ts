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
      // return this.sanitizer.sanitize(user);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Credential already exists');
      throw e;
    }
  }

  findAll() {
    return `This action returns all credential`;
  }

  /** Get Credential By Id */
  async findOne(_id): Promise<ICredential> {
    const credential = await this.model.findOne({ _id });
    this.checkCredential(credential);
    return credential;
    // return this.sanitizer.sanitize(funder);
  }


  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
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
