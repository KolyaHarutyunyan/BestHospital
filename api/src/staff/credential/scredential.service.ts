import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { StaffService } from '..';
import { CredentialService } from '../../credential';
import { MongooseUtil } from '../../util';
import { SCreateCredentialDTO, SCredentialDTO, SUpdateCredentialDTO } from './dto';
import { ICredential } from './interface';
import { StaffCredentialModel } from './scredential.model';
import { SCredentialSanitizer } from './scredential.sanitizer';

@Injectable()
export class SCredentialService {
  constructor(
    private readonly sanitizer: SCredentialSanitizer,
    private readonly credentialService: CredentialService,
    private readonly staffService: StaffService,
  ) {
    this.model = StaffCredentialModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<ICredential>;
  private mongooseUtil: MongooseUtil;

  /** Create a new staff credential */
  create = async (dto: SCreateCredentialDTO): Promise<SCredentialDTO> => {
    try {
      await Promise.all([
        this.staffService.findById(dto.staffId),
        this.credentialService.findOne(dto.credentialId)
      ]);
      const staffCredential = new this.model({
        staffId: dto.staffId,
        credentialId: dto.credentialId,
        expirationDate: dto.expirationDate,
        receiveData: dto.receiveData,
      });

      let staffC = await staffCredential.save();
      staffC = await staffC.populate('credentialId').execPopulate();
      return this.sanitizer.sanitize(staffC);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Staff credential already exists');
      throw e;
    }
  };

  // edit the credentials
  async edit(_id: string, dto: SUpdateCredentialDTO): Promise<SCredentialDTO> {
    try {
      const credential = await this.model.findById({ _id });
      this.checkCredential(credential);
      if (dto.receiveData) {
        credential.receiveData = dto.receiveData;
      }
      if (dto.expirationDate) {
        credential.expirationDate = dto.expirationDate;
      } else {
        credential.expirationDate = null;
      }
      await this.credentialService.findOne(dto.credentialId);
      credential.credentialId = dto.credentialId;

      await credential.save();
      return this.sanitizer.sanitize(credential);
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
  async find(staffId: string): Promise<SCredentialDTO[]> {
    try {
      const credential = await this.model.find({ staffId }).populate('credentialId');
      return this.sanitizer.sanitizeMany(credential);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // find the credential By Id
  async findById(_id: string): Promise<SCredentialDTO> {
    try {
      const credential = await this.model.findById({ _id }).populate('credentialId');
      this.checkCredential(credential);
      return this.sanitizer.sanitize(credential);
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
      throw new HttpException('Staff Credential with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}
