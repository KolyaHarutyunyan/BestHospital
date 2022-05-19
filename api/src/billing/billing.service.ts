import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BillingModel } from './billing.model';
import { IBilling } from './interface';
import { BillingDto } from './dto';
import { TxnDto } from './txn/dto';
import { StaffService } from '../staff/staff.service';
import { BillingSanitizer } from './interceptor/billing.interceptor';
import { TxnService } from './txn/txn.service';
import { TxnType } from './txn/txn.constants';
import { InvoiceStatus, BillingStatus, ClaimStatus } from './billing.constants';
import { IAppt } from '../appt/interface';
import { IService } from '../funding/interface/service.interface';
import { IAuthorizationService } from '../client/authorizationservice/interface';
@Injectable()
export class BillingService {
  constructor(
    private readonly sanitizer: BillingSanitizer,
    private readonly staffService: StaffService,
    private readonly transactionService: TxnService,
  ) {
    this.model = BillingModel;
  }
  private model: Model<IBilling>;

  /** create the billing */
  async create(dto: IAppt): Promise<BillingDto> {
    try {
      const authorizedService = (<any>dto.authorizedService) as IAuthorizationService;
      const service = authorizedService.serviceId as IService;
      const timeDiff = new Date(dto.endTime).valueOf() - new Date(dto.startTime).valueOf();
      const totalUnits = timeDiff / 1000 / 60 / service.size;
      const billedRate = authorizedService.modifiers[0].chargeRate;
      const billedAmount = totalUnits * billedRate;
      const totalHours = timeDiff / 1000 / 60 / 60;
      const billing = new this.model({
        appointment: dto._id,
        payer: dto.funder,
        client: dto.client,
        staff: dto.staff,
        authorization: authorizedService.authorizationId,
        authService: authorizedService._id,
        placeService: dto.placeService,
        totalHours,
        totalUnits,
        dateOfService: dto.startDate,
        billedRate,
        billedAmount,
        payerTotal: billedAmount,
        clientBalance: 0,
        // location: dto.location,
        claimStatus: ClaimStatus.NOTCLAIMED,
        invoiceStatus: InvoiceStatus.NOTINVOICED,
        status: BillingStatus.OPEN,
      });
      billing.payerBalance = billing.payerTotal - billing.payerPaid - billing.clientBalance;
      // if (dto.clientResp) billing.clientResp = dto.clientResp;
      await billing.save();
      return this.sanitizer.sanitize(billing);
    } catch (e) {
      throw e;
    }
  }
  /** startTransaction */
  async startTransaction(dto: TxnDto, billingId: string): Promise<BillingDto> {
    try {
      let billing = await this.model.findById({ _id: billingId });
      this.checkBilling(billing);
      dto.billing = billingId;
      // session.startTransaction();
      const rate = dto.rate;
      if (dto.type == TxnType.PAYERPAID) {
        billing.payerPaid += rate;
        billing.billedAmount -= rate;
      }
      if (dto.type == TxnType.CLIENTPAID) {
        billing.clientPaid += rate;
        billing.billedAmount -= rate;
        billing.payerTotal -= rate;
      }
      if (dto.type == TxnType.CLIENTRESP) {
        billing.payerTotal -= rate;
        billing.clientResp += rate;
      }
      const tsxId = await this.transactionService.create(dto);
      billing.transaction.push(tsxId);
      billing = await (await billing.save()).populate('transaction').execPopulate();
      // await session.commitTransaction();
      // session.endSession();
      return this.sanitizer.sanitize(billing);
    } catch (e) {
      // await session.abortTransaction();
      // session.endSession();
      console.log(e);
      throw e;
    }
  }
  /** set client balance */
  async setClientBalance(_id: string, clientBalance: number): Promise<BillingDto> {
    const billing = await this.model.findById(_id);
    this.checkBilling(billing);
    billing.clientBalance += clientBalance;

    await billing.save();
    return this.sanitizer.sanitize(billing);
  }
  /** abort the transaction */
  async abortTransaction(_id: string, tsxId: string, userId: string): Promise<BillingDto> {
    let billing: any = await this.model.findById({ _id });
    this.checkBilling(billing);
    await this.transactionService.void(_id, tsxId, userId);
    if (billing.transaction.type == TxnType.PAYERPAID) {
      billing.payerPaid -= billing.amount;
      billing.billedAmount += billing.amount;
    }
    if (billing.transaction.type == TxnType.CLIENTPAID) {
      billing.clientPaid -= billing.amount;
    }
    if (billing.transaction.type == TxnType.CLIENTRESP) {
      billing.payerTotal += billing.amount;
      billing.clientResp -= billing.amount;
    }
    billing = await (await billing.save()).populate('transaction').execPopulate();
    return this.sanitizer.sanitize(billing);
  }

  /** set status claimed */
  async billClaim(ids: string[]): Promise<void> {
    console.log('ok', ids);
    const bills = await this.model.update(
      { _id: { $in: ids } },
      { $set: { claimStatus: ClaimStatus.CLAIMED } },
      { multi: true },
    );
    if (bills.nModified === 0) {
      throw new HttpException(`Can't set status`, HttpStatus.NOT_MODIFIED);
    }
  }

  /** find all bills */
  async findAll(skip: number, limit: number): Promise<any> {
    skip ? skip : (skip = 0);
    limit ? limit : (limit = 10);
    const [billings, count] = await Promise.all([
      this.model
        .find({})
        .populate('authService')
        .populate('client')
        .populate('payer')
        .populate('placeService')
        .populate('transaction')
        .sort({ _id: 1 })
        .skip(skip)
        .limit(limit),
      this.model.countDocuments(),
    ]);
    const sanitizeBills = this.sanitizer.sanitizeMany(billings);
    return { bills: sanitizeBills, count };
  }

  /** find all with many ids */
  async findByIds(bills: string[], isClaimed = null): Promise<BillingDto[]> {
    const billings = await this.model
      .find({ _id: { $in: bills } })
      .populate({ path: 'authService', populate: 'serviceId' })
      .populate('authorization');
    if (isClaimed) {
      billings.map((bill) => {
        if (bill.claimStatus == ClaimStatus.CLAIMED) {
          throw new HttpException('Billing has already been used', HttpStatus.NOT_FOUND);
        }
      });
    }
    return this.sanitizer.sanitizeMany(billings);
  }

  /** find bill by id */
  async findOne(_id: string, skip: number, limit: number): Promise<any> {
    skip ? skip : (skip = 0);
    limit ? limit : (limit = 10);
    const billing = await this.model
      .findById(_id)
      .populate('authService')
      .populate('client')
      .populate('payer')
      .populate('placeService')
      .populate([
        {
          path: 'transaction',
          options: {
            skip,
            limit,
          },
        },
      ]);
    this.checkBilling(billing);
    const billingCount = await this.model.findById(_id);
    const sanitizeBill = this.sanitizer.sanitize(billing);
    return { bills: sanitizeBill, count: billingCount.transaction.length };
  }

  /** Set billing status */
  setStatus = async (_id: string, status: string, userId: string) => {
    // can automatically
    const [, billing] = await Promise.all([
      this.staffService.findById(userId),
      this.model.findById({ _id }),
    ]);
    billing.status = status;
    this.checkBilling(billing);
    return await billing.save();
  };

  /** set claim status in billing */
  async setClaimStatus(_id: string, claimStatus: string): Promise<BillingDto> {
    const billing = await this.model.findOneAndUpdate(
      { _id },
      { $set: { claimStatus } },
      { new: true },
    );
    this.checkBilling(billing);
    return this.sanitizer.sanitize(billing);
  }

  /** set invoice status in billing */
  async setInvoiceStatus(_id: string, invoiceStatus: string): Promise<BillingDto> {
    const billing = await this.model.findOneAndUpdate(
      { _id },
      { $set: { invoiceStatus } },
      { new: true },
    );
    this.checkBilling(billing);
    return this.sanitizer.sanitize(billing);
  }

  /** Private methods */
  /** if the billing is not found, throws an exception */
  private checkBilling(billing: IBilling) {
    if (!billing) {
      throw new HttpException('Billing with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}
