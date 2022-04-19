import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ClaimPmtDto } from './dto/claim-pmt.dto.';
import { ClaimService } from '../claim/claim.service';
import { MongooseUtil } from '../util/mongoose.util';
import { PaymentType } from './claim-pmt.contants';
import { ClaimPmtModel } from './claim-pmt.model';
import { ClaimPmtSanitizer } from './claim-pmt.sanitizer';
import { CreateClaimPmtDto } from './dto';
import { UpdateClaimPmtDto } from './dto/update-claim-payment.dto';
import { IClaimPmt } from './interface';
import { FileService } from '../files/file.service';

@Injectable()
export class ClaimPmtService {
  constructor(
    private readonly sanitizer: ClaimPmtSanitizer,
    private readonly claimService: ClaimService,
    private readonly fileService: FileService,
  ) {
    this.model = ClaimPmtModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IClaimPmt>;
  private mongooseUtil: MongooseUtil;

  /** create claim payment */
  async create(dto: CreateClaimPmtDto): Promise<ClaimPmtDto> {
    await this.claimService.findOne(dto.claimId);
    const claimPmt = new this.model({
      paymentAmount: dto.paymentAmount,
      paymentType: dto.paymentType,
      fundingSource: dto.fundingSource,
      claimId: dto.claimId,
    });
    if (dto.paymentType === PaymentType.CHECK && !dto.checkNumber) {
      throw new HttpException(`checkNumber can't be empty`, HttpStatus.BAD_REQUEST);
    }
    if (dto.paymentType === PaymentType.ACH && !dto.achNumber) {
      throw new HttpException(`achNumber can't be empty`, HttpStatus.BAD_REQUEST);
    }
    claimPmt.checkNumber = dto.checkNumber;
    claimPmt.achNumber = dto.achNumber;
    await claimPmt.save();
    return this.sanitizer.sanitize(claimPmt);
  }
  /** add document to claim-pmt */
  async addDocument(_id: string, fileId: string): Promise<ClaimPmtDto> {
    const [claimPmt, file] = await Promise.all([
      this.model.findById(_id),
      this.fileService.getOne(fileId),
    ]);
    this.checkClaimPmt(claimPmt);
    claimPmt.documents.push(fileId);
    await claimPmt.save();
    return this.sanitizer.sanitize(claimPmt);
  }
  /** delete document in the claim-pmt */
  async deleteDocument(_id: string, fileId: string): Promise<ClaimPmtDto> {
    const claimPmt = await this.model.findById(_id);
    this.checkClaimPmt(claimPmt);
    this.removeFromList(claimPmt.documents, fileId);
    await claimPmt.save();
    return this.sanitizer.sanitize(claimPmt);
  }
  findAll() {
    return `This action returns all claimPayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} claimPayment`;
  }

  update(id: string, updateClaimPmtDto: UpdateClaimPmtDto) {
    return `This action updates a #${id} claimPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} claimPayment`;
  }
  /** Private methods */
  /** if the claim-pmt is not found, throws an exception */
  private checkClaimPmt(claimPmt: IClaimPmt) {
    if (!claimPmt) {
      throw new HttpException('ClaimPmt with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
  /** Removes a file from the list if the file exists */
  private removeFromList(list: any[], element: any) {
    const index = list.findIndex((id) => id == element);
    if (index !== -1) {
      list.splice(index, 1);
    } else {
      throw new HttpException('Was not found in list', HttpStatus.NOT_FOUND);
    }
  }
}
