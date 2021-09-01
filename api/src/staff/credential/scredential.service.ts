import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CredentialDTO, CreateCredentialDTO, UpdateCredentialDTO } from './dto';
import { CredentialService } from '../../credential';
import { StaffService } from '..';
import { StaffCredentialModel } from './scredential.model'
import { MongooseUtil } from '../../util';
import { Model } from 'mongoose';
import { ICredential } from './interface';

@Injectable()
export class SCredentialService {
  constructor(
    private readonly credentialService: CredentialService,
    private readonly staffService: StaffService,

  ) {
    this.model = StaffCredentialModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<ICredential>;
  private mongooseUtil: MongooseUtil;

  /** Create a new staff credential */
  create = async (dto: CreateCredentialDTO): Promise<CredentialDTO> => {
    try {
      await this.staffService.findById(dto.staffId);
      const credential = await this.credentialService.findOne(dto.credentialId);
      let staffCredential = new this.model({
        staffId: dto.staffId,
        credentialId: dto.credentialId,
        expirationDate: dto.expirationDate
      });

      await staffCredential.save();
      return staffCredential;
      // return this.sanitizer.sanitize(user);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Staff credential already exists');
      throw e;
    }
  };

  // edit the credentials
  async edit(_id: string, dto: UpdateCredentialDTO): Promise<CredentialDTO> {
    try {
      const credential = await this.model.findById({ _id });
      this.checkCredential(credential);
      if (dto.expirationDate) {
        credential.expirationDate = dto.expirationDate;
      }
      if (dto.credentialId) {
        const globCredential = await this.credentialService.findOne(dto.credentialId);
        credential.credentialId = dto.credentialId;
      }
      await credential.save()
      return credential;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // delete the credentials
  async delete(_id: string): Promise<string> {
    try {
      const credential = await this.model.findByIdAndDelete({ _id });
      this.checkCredential(credential);
      return credential._id;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // find the credentials By Staff Id
  async find(staffId: string): Promise<CredentialDTO[]> {
    try {
      const credential = await this.model.find({ staffId }).populate('credentialId');
      this.checkCredential(credential[0])
      return credential;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // find the credential By Id
  async findById(_id: string): Promise<CredentialDTO> {
    try {
      const credential = await this.model.findById({ _id }).populate('credentialId');
      this.checkCredential(credential)
      return credential;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /** Private methods */
  /** if the credential is not valid, throws an exception */
  private checkCredential(credential: ICredential) {
    if (!credential) {
      throw new HttpException(
        'Staff Credential with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
