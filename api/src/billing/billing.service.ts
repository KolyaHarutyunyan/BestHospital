import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BillingModel } from './billing.model';
import { IBilling } from './interface';
import { BillingDto } from './dto';
import { TransactionDto } from './transaction/dto';
import { StaffService } from '../staff/staff.service';
import { BillingSanitizer } from './interceptor/billing.interceptor';
import { TransactionService } from './transaction/transaction.service';
import { TransactionType } from './transaction/transaction.constants';
import { InvoiceStatus, BillingStatus, ClaimStatus } from './billing.constants';

@Injectable()
export class BillingService {
  constructor(
    private readonly sanitizer: BillingSanitizer,
    private readonly staffService: StaffService,
    private readonly transactionService: TransactionService,
  ) {
    this.model = BillingModel;
  }
  private model: Model<IBilling>;

  /** create the billing */
  async create(dto: any): Promise<BillingDto> {
    try {
      const billing = new this.model({
        appointment: dto._id,
        payer: dto.funder,
        client: dto.client,
        staff: dto.staff,
        authorization: dto.authorizedService.authorizationId,
        authService: dto.authorizedService._id,
        placeService: dto.placeService,
        totalHours: dto.endTime.getHours() - dto.startTime.getHours(),
        totalUnits:
          dto.endTime.getHours() - dto.startTime.getHours() / dto.authorizedService.serviceId.size,
        dateOfService: dto.startDate,
        billedRate: dto.authorizedService.modifiers[0].chargeRate,
        billedAmount: 0,
        payerTotal: 0,
        balance: 0,
        location: dto.location,
        claimStatus: ClaimStatus.NOTCLAIMED,
        invoiceStatus: InvoiceStatus.NOTINVOICED,
        status: BillingStatus.OPEN,
      });
      billing.billedAmount = billing.billedRate * billing.totalUnits;
      billing.payerTotal = dto.billedAmount;
      billing.balance = dto.billedAmount;
      if (dto.clientResp) billing.clientResp = dto.clientResp;
      await billing.save();
      return this.sanitizer.sanitize(billing);
    } catch (e) {
      throw e;
    }
  }
  /** startTransaction */
  async startTransaction(
    dto: TransactionDto,
    billingId: string,
    session: any,
  ): Promise<BillingDto> {
    try {
      let billing = await this.model.findById({ _id: billingId }).session(session);
      this.checkBilling(billing);
      dto.billing = billingId;
      session.startTransaction();
      const tsxId = await this.transactionService.create(dto);

      const rate = dto.rate;
      if (dto.type == TransactionType.PAYERPAID) {
        billing.payerPaid += rate;
        billing.billedAmount -= rate;
      }
      if (dto.type == TransactionType.CLIENTPAID) {
        billing.clientPaid += rate;
      }
      if (dto.type == TransactionType.CLIENTRESP) {
        billing.payerTotal -= rate;
        billing.clientResp += rate;
      }
      billing.transaction.push(tsxId);
      billing = await (await billing.save()).populate('transaction').execPopulate();
      await session.commitTransaction();
      session.endSession();
      return this.sanitizer.sanitize(billing);
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      console.log(e);
      throw e;
    }
  }
  /** abort the transaction */
  async abortTransaction(_id: string, tsxId: string, userId: string): Promise<BillingDto> {
    let billing: any = await this.model.findById({ _id });
    this.checkBilling(billing);
    await this.transactionService.void(_id, tsxId, userId);
    if (billing.transaction.type == TransactionType.PAYERPAID) {
      billing.payerPaid -= billing.amount;
      billing.billedAmount += billing.amount;
    }
    if (billing.transaction.type == TransactionType.CLIENTPAID) {
      billing.clientPaid -= billing.amount;
    }
    if (billing.transaction.type == TransactionType.CLIENTRESP) {
      billing.payerTotal += billing.amount;
      billing.clientResp -= billing.amount;
    }
    billing = await (await billing.save()).populate('transaction').execPopulate();
    return this.sanitizer.sanitize(billing);
  }

  /** set status claimed */
  async billClaim(ids: string[]): Promise<void> {
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
  async findAll(): Promise<BillingDto[]> {
    const billings = await this.model
      .find({})
      .populate('authService')
      .populate('client')
      .populate('payer')
      .populate('placeService')
      .populate('transaction');
    return this.sanitizer.sanitizeMany(billings);
  }

  /** find all with many ids */
  async findByIds(bills: string[], isClaimed = null): Promise<BillingDto[]> {
    const billings = await this.model
      .find({ _id: { $in: bills } })
      .populate({ path: 'authService', populate: 'serviceId' })
      .populate('authorization');
    if (isClaimed) {
      billings.map((bill) => {
        if (bill.claimStatus == 'CLAIMED') {
          throw new HttpException('Billing has already been used', HttpStatus.NOT_FOUND);
        }
      });
    }
    return this.sanitizer.sanitizeMany(billings);
  }

  /** find bill by id */
  async findOne(_id: string): Promise<BillingDto> {
    const billing = await this.model
      .findById(_id)
      .populate('authService')
      .populate('client')
      .populate('payer')
      .populate('placeService')
      .populate('transaction');
    this.checkBilling(billing);
    return this.sanitizer.sanitize(billing);
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
