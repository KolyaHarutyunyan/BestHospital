import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { Model, startSession } from 'mongoose';
import { ClaimPmtDto } from './dto/claim-pmt.dto.';
import { ClaimService } from '../claim/claim.service';
import { MongooseUtil } from '../util/mongoose.util';
import { PaymentType } from './claim-pmt.contants';
import { ClaimPmtModel } from './claim-pmt.model';
import { ClaimPmtSanitizer } from './claim-pmt.sanitizer';
import { CreateClaimPmtDto, CreateReceivableDTO } from './dto';
import { UpdateClaimPmtDto } from './dto/update-claim-payment.dto';
import { IClaimPmt } from './interface';
import { FileService } from '../files/file.service';
import { TransactionType } from '../billing/transaction/transaction.constants';
import { IReceivable } from '../claim/interface/receivable.interface';
import { FundingService } from '../funding/funding.service';
import { BillingService } from '../billing/billing.service';
import { IBilling } from '../billing/interface';
import { BillingDto } from '../billing/dto';

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

    await claimPmt.save();
    return this.sanitizer.sanitize(claimPmt);
  }
  /** add claim to the claim-pmt */
  async addClaim(_id: string, claimId: string): Promise<ClaimPmtDto> {
    const [claimPmt, claim] = await Promise.all([
      this.model.findById(_id),
      this.claimService.findOne(claimId),
    ]);
    this.checkClaimPmt(claimPmt);
    claimPmt.claimIds.push(claimId);
    await claimPmt.save();
    return this.sanitizer.sanitize(claimPmt);
  }
  /** add claim to the claim-pmt */
  async addReceivable(
    _id: string,
    claimId: string,
    dto: CreateReceivableDTO,
  ): Promise<ClaimPmtDto> {
    const claimPmt = await this.model
      .findById(_id)
      .populate('claimIds')
      .populate({
        path: 'claimIds',
        populate: {
          path: 'receivable',
          populate: {
            path: 'bills',
          },
        },
      });
    this.checkClaimPmt(claimPmt);
    const claimIndex = this.checkClaim(claimPmt.claimIds, claimId);
    const claim: any = claimPmt.claimIds[claimIndex];
    const receivables: any = this.checkReceivable(claim.receivable, dto.receivableIds);
    const amountPaided = await this.createPayment(claimPmt, receivables);
    await this.claimService.setAmount(claimId, dto.receivableIds);
    claimPmt.paymentAmount = amountPaided;
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
  /** find all claim-pmts */
  async findAll(): Promise<ClaimPmtDto[]> {
    const claimPmts = await this.model.find().populate('claimIds');
    return this.sanitizer.sanitizeMany(claimPmts);
  }
  /** find claim-pmt by id */
  async findOne(_id: string): Promise<ClaimPmtDto> {
    const claimPmt = await this.model.findById(_id).populate('claimIds');
    return this.sanitizer.sanitize(claimPmt);
  }

  update(id: string, updateClaimPmtDto: UpdateClaimPmtDto) {
    return `This action updates a #${id} claimPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} claimPayment`;
  }
  /** Private methods */
  private async createPayment(claimPmt, receivables) {
    let paymentAmount = claimPmt.paymentAmount;
    console.log(paymentAmount, 'paymentAmount1');

    let payed = false;
    let paidAmount = 0;
    while (paymentAmount > 0) {
      if (!receivables.length) {
        if (!payed) {
          throw new HttpException('Claim have not payable receivables', HttpStatus.NOT_FOUND);
        }
        return paymentAmount;
      }
      const lowReceivable: any = await this.findLowReceivable(receivables);
      if (paymentAmount >= lowReceivable.amountTotal && lowReceivable.amountTotal !== 0) {
        const receivableBalance = await this.fullPay(
          lowReceivable,
          paymentAmount,
          // dto.user.id,
          claimPmt._id,
        );
        paymentAmount -= receivableBalance;
        paidAmount += paymentAmount;
        payed = true;
      } else if (paymentAmount < lowReceivable.amountTotal) {
        const receivableBalance = await this.partialPay(
          lowReceivable,
          paymentAmount,
          // dto.user.id,
          claimPmt._id,
        );
        paymentAmount -= receivableBalance;
        payed = true;
      }
      receivables = receivables.filter((rec) => rec._id !== lowReceivable._id);
    }
    return paymentAmount;
  }
  /** full pay */
  private async fullPay(
    receivable,
    paymentAmount,
    // userId: string,
    claimPmtId: string,
  ): Promise<number> {
    console.log('aaaahhhh');
    const session = await startSession();
    // await this.claimService.updateReceivableAmount(claimId, receivable._id, receivable.amountTotal);
    const bills = [];
    for (let i = 0; i < receivable.bills.length; i++) {
      const bill = receivable.bills[i];
      const transactionInfo = {
        type: TransactionType.PAYERPAID,
        date: new Date(),
        rate: bill.billedAmount,
        paymentRef: 'chka',
        billing: bill._id,
        creator: bill._id,
      };
      await this.billingService.startTransaction(transactionInfo, bill._id, session);
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
          type: TransactionType.PAYERPAID,
          date: new Date(),
          rate: lowBill.billedAmount,
          paymentRef: 'chka',
          billing: lowBill._id,
          creator: lowBill._id,
        };
        await this.billingService.startTransaction(transactionInfo, lowBill._id, session);
        receivable.amountTotal -= lowBill.billedAmount;
        paymentAmount -= lowBill.billedAmount;
        paidedAmount += lowBill.billedAmount;
      } else if (paymentAmount < lowBill.billedAmount) {
        const transactionInfo = {
          type: TransactionType.PAYERPAID,
          date: new Date(),
          rate: paymentAmount,
          paymentRef: 'chka',
          billing: lowBill._id,
          creator: lowBill._id,
        };
        await this.billingService.startTransaction(transactionInfo, lowBill._id, session);
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
  findLowBill(bills): Promise<BillingDto> {
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
    const index = list.findIndex((id) => id == element);
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
      const index = list.findIndex((receivable) => receivable._id == receivables[i]);
      if (index === -1) {
        throw new HttpException('Claim was not found', HttpStatus.NOT_FOUND);
      }
      populateReceivable.push(list[index]);
    }
    return populateReceivable;
  }
}
