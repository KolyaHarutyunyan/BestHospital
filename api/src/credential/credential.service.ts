import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCredentialDto, CredentialDTO, UpdateCredentialDTO } from './dto';
import { ICredential } from './interface';
import { CredentialModel } from './credential.model'
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';

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
      // return this.sanitizer.sanitize(credential);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Credential already exists');
      throw e;
    }
  }

  /** Get All Credential */
  async findAll(): Promise<CredentialDTO[]> {
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

  /** Get All Credentials By Ids */
  async findAllByIds(ids): Promise<CredentialDTO[]> {
    try {
      const credential = await this.model.find({ '_id': { $in: ids } });
      console.log(credential);
      return credential;
    }
    catch (e) {
      throw e
    }
  }

  /** Get Credential By Id */
  async findOne(_id): Promise<CredentialDTO> {
    try {
      const credential = await this.model.findById({ _id });
      this.checkCredential(credential);
      return credential;
      // return this.sanitizer.sanitize(credential);
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

  /** Delete the Credential */
  async remove(_id: string): Promise<string> {
    const credential = await this.model.findById({ _id });
    this.checkCredential(credential);
    await credential.remove()
    return credential._id;
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
