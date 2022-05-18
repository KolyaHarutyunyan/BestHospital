import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { Model, startSession } from 'mongoose';
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
import { TxnType } from '../billing/txn/txn.constants';
import { IReceivable } from '../claim/interface/receivable.interface';
import { FundingService } from '../funding/funding.service';
import { BillingService } from '../billing/billing.service';
import { IBilling } from '../billing/interface';
import { BillingDto } from '../billing/dto';
import { IClaimPmtCount } from './interface/claim-pmt.interface';

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
    if (dto.documents.length) {
      dto.documents.map((doc) => claimPmt.documents.push(doc));
    }
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
    let sumPaid = 0;
    let recAmount = 0;
    let amountPaided = 0;
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
      let countBalance = receivable.coINS + receivable.copay + receivable.deductible;
      const clientBalance = countBalance == 0 ? 0 : countBalance / data.receivable.bills.length;
      let billedAmount = await this.createPayment(data, clientBalance, dto.user.id);

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
    return this.sanitizer.sanitize(claimPmt);
  }
  /** add document to claim-pmt */
  async addDocument(_id: string, dto: CreateDocDTO): Promise<ClaimPmtDto> {
    const [claimPmt]: any = await Promise.all([
      this.model.findById(_id),
      this.fileService.getOne(dto.file.id),
    ]);
    this.checkClaimPmt(claimPmt);
    claimPmt.documents.push(dto.file);
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
  private async createPayment(data, clientBalance: number, userId: string): Promise<number> {
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
          clientBalance,
          lowBill._id,
          userId,
        );
        receivable.amountTotal -= billedAmount;
        data.paidAMT -= billedAmount;
        paidAmount += billedAmount;
      } else if (data.paidAMT < lowBill.billedAmount) {
        const billedAmount = await this.partialBillPay(
          data.paidAMT,
          clientBalance,
          lowBill._id,
          userId,
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
    clientBalance: number,
    billingId: string,
    userId: string,
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
      this.billingService.setClientBalance(billingId, clientBalance),
    ]);
    return billedAmount;
  }
  /** partial billing pay */
  private async partialBillPay(
    paidAMT: number,
    clientBalance: number,
    billingId: string,
    userId: string,
  ): Promise<number> {
    const transactionInfo = {
      type: TxnType.PAYERPAID,
      date: new Date(),
      rate: paidAMT,
      paymentRef: 'chka',
      billing: billingId,
      creator: userId,
    };
    await Promise.all([
      this.billingService.startTransaction(transactionInfo, billingId),
      this.billingService.setClientBalance(billingId, clientBalance),
    ]);
    return paidAMT;
  }

  /** full pay */
  private async fullPay(
    receivable,
    paymentAmount,
    // userId: string,
    claimPmtId: string,
  ): Promise<number> {
    console.log('aaaahhhh');
    // await this.claimService.updateReceivableAmount(claimId, receivable._id, receivable.amountTotal);
    const bills = [];
    for (let i = 0; i < receivable.bills.length; i++) {
      const bill = receivable.bills[i];
      const transactionInfo = {
        type: TxnType.PAYERPAID,
        date: new Date(),
        rate: bill.billedAmount,
        paymentRef: 'chka',
        billing: bill._id,
        creator: bill._id,
      };
      await this.billingService.startTransaction(transactionInfo, bill._id);
    }
    // receivable.bills.map((bill) => {
    //   bills.push(this.billingService.startTransaction(transactionInfo, bill._id, session));
    // });
    // await Promise.all(bills);
    return receivable.amountTotal;
  }
  /** partial pay */
  private async partialPay(receivable, paymentAmount, claimPmt) {
    const session = await startSession();
    let paidedAmount = 0;
    // await this.claimService.updateReceivableAmount(claimId, receivable._id, receivable.amountTotal);
    for (let i = 0; i <= receivable.bills.length; i++) {
      const lowBill: any = this.findLowBill(receivable.bills);
      if (lowBill.billedAmount === 0) {
        i = 0;
        continue;
      }
      if (!lowBill || paymentAmount === 0) {
        return paymentAmount;
      }
      if (paymentAmount >= lowBill.billedAmount) {
        const transactionInfo = {
          type: TxnType.PAYERPAID,
          date: new Date(),
          rate: lowBill.billedAmount,
          paymentRef: 'chka',
          billing: lowBill._id,
          creator: lowBill._id,
        };
        await this.billingService.startTransaction(transactionInfo, lowBill._id);
        receivable.amountTotal -= lowBill.billedAmount;
        paymentAmount -= lowBill.billedAmount;
        paidedAmount += lowBill.billedAmount;
      } else if (paymentAmount < lowBill.billedAmount) {
        const transactionInfo = {
          type: TxnType.PAYERPAID,
          date: new Date(),
          rate: paymentAmount,
          paymentRef: 'chka',
          billing: lowBill._id,
          creator: lowBill._id,
        };
        await this.billingService.startTransaction(transactionInfo, lowBill._id);
        receivable.amountTotal -= lowBill.billedAmount;
        paidedAmount += paymentAmount;
        paymentAmount = 0;
      }
      receivable.bills = receivable.bills.filter((rec) => rec._id !== lowBill._id);
      i = 0;
    }
    // receivable.bills.map((bill) => {
    //   bills.push(this.billingService.startTransaction(transactionInfo, bill._id, session));
    // });
    // await Promise.all(bills);
    return paidedAmount;
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
