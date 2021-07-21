import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { ICredential } from './interface';
import { CredentialModel } from './credential.model'
import { Model } from 'mongoose';
import { Public, ParseObjectIdPipe } from '../util';

@Injectable()
export class CredentialService {
  constructor(
    // private readonly sanitizer: FundingSanitizer,
  ) {
    this.model = CredentialModel;
  }
  private model: Model<ICredential>;

  create(createCredentialDto: CreateCredentialDto) {
    const credentials = new this.model({ name: 'Hi' });
    credentials.save();
  }

  findAll() {
    return `This action returns all credential`;
  }

  /** Get Credential By Id */
  async findOne(_id: ParseObjectIdPipe): Promise<ICredential> {
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
