import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { ClaimPmtDto } from './dto/claim-pmt.dto.';
import { ClaimService } from '../claim/claim.service';
import { MongooseUtil } from '../util/mongoose.util';
import { ClaimPmtStatus, DocumentStatus, PaymentType } from './claim-pmt.contants';
import { ClaimPmtModel } from './claim-pmt.model';
import { ClaimPmtSanitizer } from './claim-pmt.sanitizer';
import { CreateClaimPmtDto, CreateClaimReceivableDTO, CreateDocDTO } from './dto';
import { UpdateClaimPmtDto } from './dto/update-claim-payment.dto';
import { IClaimPmt } from './interface';
import { FileService } from '../files/file.service';
import { TxnType } from '../txn/txn.constants';
import { IReceivable } from '../claim/interface/receivable.interface';
import { FundingService } from '../funding/funding.service';
import { BillingService } from '../billing/billing.service';
import { IBilling } from '../billing/interface';
import { BillingDto } from '../billing/dto';
import { IClaimPmtCount, IClaimPmtDoc } from './interface/claim-pmt.interface';
import { ITxn } from 'src/txn/interface';

@Injectable()
export class ClaimPmtService {
  constructor(
    private readonly sanitizer: ClaimPmtSanitizer,
    private readonly claimService: ClaimService,
    private readonly billingService: BillingService,
    private readonly fundingService: FundingService,
    private readonly fileService: FileService,
  ) {
    this.model = ClaimPmtModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IClaimPmt>;
  private mongooseUtil: MongooseUtil;

  /** create claim payment */
  async create(dto: CreateClaimPmtDto): Promise<ClaimPmtDto> {
    await this.fundingService.findById(dto.fundingSource);
    const claimPmt = new this.model({
      paymentAmount: dto.paymentAmount,
      paymentType: dto.paymentType,
      fundingSource: dto.fundingSource,
      checkNumber: dto.checkNumber,
    });
    if (dto.paymentDate) claimPmt.paymentDate = dto.paymentDate;
    await claimPmt.save();
    return this.sanitizer.sanitize(claimPmt);
  }
  /** update claim payment */
  async update(_id: string, dto: UpdateClaimPmtDto): Promise<ClaimPmtDto> {
    const claimPmt = await this.model.findById(_id);
    this.checkClaimPmt(claimPmt);
    if (dto.paymentDate) claimPmt.paymentDate = dto.paymentDate;
    if (dto.paymentType) claimPmt.paymentType = dto.paymentType;
    if (dto.checkNumber) claimPmt.checkNumber = dto.checkNumber;
    await claimPmt.save();
    return this.sanitizer.sanitize(claimPmt);
  }
  /** create payment */
  async payment(_id: string, dto: CreateClaimReceivableDTO): Promise<ClaimPmtDto> {
    const session = await mongoose.startSession();
    try {
      let sumPaid = 0;
      let recAmount = 0;
      let amountPaided = 0;
      let txn = [];
      dto.receivables.map((receivable) => (sumPaid += receivable.paidAMT));
      const [claimPmt, claim] = await Promise.all([
        this.model.findById(_id),
        this.claimService.findOne(dto.claimId),
      ]);
      if (claimPmt.paymentAmount < sumPaid) {
        throw new HttpException('amount more than expected', HttpStatus.BAD_REQUEST);
      }
      this.checkClaimPmt(claimPmt);

      for (let i = 0; i < dto.receivables.length; i++) {
        const receivable = dto.receivables[i];
        const index = claim.receivable.findIndex((rec) => {
          recAmount += rec.amountTotal;
          return rec._id.toString() == receivable.receivableId.toString();
        });
        if (index === -1) {
          throw new HttpException('Receivable was not found', HttpStatus.NOT_FOUND);
        }
        const data = {
          receivable: claim.receivable[index],
          allowedAMT: receivable.allowedAMT,
          deductible: receivable.deductible,
          copay: receivable.copay,
          coINS: receivable.coINS,
          paidAMT: receivable.paidAMT,
        };
        const countBalance = receivable.coINS + receivable.copay + receivable.deductible;
        const clientResp = countBalance == 0 ? 0 : countBalance / data.receivable.bills.length;
        session.startTransaction();
        const billedAmount = await this.createPayment(data, clientResp, dto.user.id, txn);
        amountPaided += billedAmount;
        /** update receivable total amount */
        const updateRecAmount = await this.claimService.setAmountRec(
          claim._id,
          data.receivable._id,
          data.receivable.amountTotal,
          data.allowedAMT,
          data.paidAMT,
        );
      }
      claimPmt.claimIds.push(dto.claimId);
      claimPmt.totalBilled = recAmount;
      claimPmt.totalUsed += amountPaided;
      claimPmt.paymentAmount -= sumPaid;
      if (claimPmt.paymentAmount == 0) claimPmt.status == ClaimPmtStatus.CLOSE;
      await claimPmt.save();
      session.commitTransaction();
      return this.sanitizer.sanitize(claimPmt);
    } catch (e) {
      console.log(e, 'error');
      await session.abortTransaction();
    }
  }
  /** add document to claim-pmt */
  async addDocument(_id: string, dto: CreateDocDTO): Promise<ClaimPmtDto> {
    const document: IClaimPmtDoc = {
      name: dto.name ? dto.name : '',
      status: DocumentStatus.ACTIVE,
      file: dto.file,
    } as IClaimPmtDoc;
    const [claimPmt]: any = await Promise.all([
      this.model.findById(_id),
      this.fileService.getOne(dto.file.id),
    ]);
    this.checkClaimPmt(claimPmt);
    claimPmt.documents.push(document);
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
  /** find all claim-pmts */
  async findAll(skip: number, limit: number): Promise<IClaimPmtCount> {
    skip ? skip : (skip = 0);
    limit ? limit : (limit = 10);
    const [claimPmts, count] = await Promise.all([
      this.model
        .find()
        .populate('fundingSource')
        .populate([
          {
            path: 'claimIds',
            populate: {
              path: 'client',
            },
          },
          {
            path: 'claimIds',
            populate: {
              path: 'funder',
            },
          },
        ])
        .skip(skip)
        .limit(limit),
      this.model.countDocuments(),
    ]);
    const sanClaimPmt = this.sanitizer.sanitizeMany(claimPmts);
    return { claimPmt: sanClaimPmt, count };
  }
  /** find claim-pmt by id */
  async findOne(_id: string): Promise<ClaimPmtDto> {
    const claimPmt = await this.model
      .findById(_id)
      .populate('fundingSource')
      .populate({
        path: 'claimIds',
        populate: {
          path: 'client',
        },
      })
      .populate({
        path: 'claimIds',
        populate: {
          path: 'funder',
        },
      })
      .populate({
        path: 'claimIds',
        populate: {
          path: 'receivable.bills',
        },
      });
    return this.sanitizer.sanitize(claimPmt);
  }

  remove(id: number) {
    return `This action removes a #${id} claimPayment`;
  }
  /** Private methods */
  /** create payment */
  private async createPayment(data, clientResp: number, userId: string, txn): Promise<number> {
    const receivable = data.receivable;
    let bills = data.receivable.bills;
    let paidAmount = 0;
    while (data.paidAMT > 0) {
      const lowBill = this.findLowBill(bills);
      if (lowBill.billedAmount === 0) {
        return paidAmount;
      }
      if (data.paidAMT >= lowBill.billedAmount) {
        const billedAmount = await this.fullBillPay(
          lowBill.billedAmount,
          clientResp,
          lowBill._id,
          userId,
          txn,
        );
        receivable.amountTotal -= billedAmount;
        data.paidAMT -= billedAmount;
        paidAmount += billedAmount;
      } else if (data.paidAMT < lowBill.billedAmount) {
        const billedAmount = await this.partialBillPay(
          data.paidAMT,
          clientResp,
          lowBill._id,
          userId,
          txn,
        );
        receivable.amountTotal -= data.paidAMT;
        data.paidAMT = 0;
        paidAmount += billedAmount;
      }
      bills = bills.filter((rec) => rec._id !== lowBill._id);
      if (bills.length === 0) {
        return paidAmount;
      }
    }
    return paidAmount;
  }
  /** full billing pay */
  private async fullBillPay(
    billedAmount: number,
    clientResp: number,
    billingId: string,
    userId: string,
    txn: ITxn[],
  ): Promise<number> {
    const transactionInfo = {
      type: TxnType.PAYERPAID,
      date: new Date(),
      rate: billedAmount,
      paymentRef: 'chka',
      billing: billingId,
      creator: userId,
    };
    await Promise.all([
      this.billingService.startTransaction(transactionInfo, billingId),
      this.billingService.setClientBalance(billingId, clientResp),
    ]);
    return billedAmount;
  }
  /** partial billing pay */
  private async partialBillPay(
    paidAMT: number,
    clientResp: number,
    billingId: string,
    userId: string,
    txn: ITxn[],
  ): Promise<number> {
    const transactionInfo = {
      type: TxnType.PAYERPAID,
      date: new Date(),
      rate: paidAMT,
      paymentRef: 'chka',
      billing: billingId,
      creator: userId,
    };
    txn.push(transactionInfo);
    await Promise.all([
      this.billingService.startTransaction(transactionInfo, billingId),
      this.billingService.setClientBalance(billingId, clientResp),
    ]);
    return paidAMT;
  }

  /** find low receivable amount */
  async findLowReceivable(receivables): Promise<IReceivable> {
    return receivables.reduce((prev, curr) => {
      return prev.amountTotal < curr.amountTotal ? prev : curr;
    });
  }
  /** find low bill amount */
  findLowBill(bills): BillingDto {
    return bills.reduce((prev, curr) => {
      return prev.billedAmount < curr.billedAmount ? prev : curr;
    });
  }
  /** if the claim-pmt is not found, throws an exception */
  private checkClaimPmt(claimPmt: IClaimPmt) {
    if (!claimPmt) {
      throw new HttpException('ClaimPmt with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
  /** Removes a file from the list if the file exists */
  private removeFromList(list: any[], element: any) {
    const index = list.findIndex((file) => file.id.toString() == element.toString());
    if (index !== -1) {
      list.splice(index, 1);
    } else {
      throw new HttpException('Was not found in list', HttpStatus.NOT_FOUND);
    }
  }
  /** check if the claim exists */
  private checkClaim(list: any[], element: string) {
    const index = list.findIndex((claim) => claim._id == element);
    if (index === -1) {
      throw new HttpException('Claim was not found', HttpStatus.NOT_FOUND);
    }
    return index;
  }
  /** check if the receivable exists */
  private checkReceivable(list: any[], receivables: string[]) {
    const populateReceivable = [];
    for (let i = 0; i < receivables.length; i++) {
      const index = list.findIndex(
        (receivable) => receivable._id.toString() == receivables[i].toString(),
      );
      if (index === -1) {
        throw new HttpException('Receivable was not found', HttpStatus.NOT_FOUND);
      }
      populateReceivable.push(list[index]);
    }
    return populateReceivable;
  }
}

/**
 * claimId: claimId,
 * receivables: [{
 * receivableId: receivableId
 * allowedAMT: 100,
 * deductible: 50,
 * copay: 70,
 * coINS: 20,
 * paidAMT: 100
 * },
 * {
 * receivableId: receivableId
 * allowedAMT: 150,
 * deductible: 60,
 * copay: 80,
 * coINS: 30,
 * paidAMT: 150
 * }]
 */
