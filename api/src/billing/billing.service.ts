import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BillingModel } from './billing.model';
import { IBilling } from './interface';
import { CreateBillingDto, UpdateBillingDto, BillingDto, TransactionDto } from './dto';
import { StaffService } from '../staff/staff.service';
import { BillingSanitizer } from './interceptor/billing.interceptor';

@Injectable()
export class BillingService {
  constructor(
    private readonly sanitizer: BillingSanitizer,
    private readonly staffService: StaffService,
  ) {
    this.model = BillingModel;
  }
  private model: Model<IBilling>;

  /** create the billing */
  async create(dto: any): Promise<BillingDto> {
    try {
      let billing = new this.model({
        appointment: dto.appointment,
        payer: dto.payer,
        client: dto.client,
        staff: dto.staff,
        authorization: dto.authorizedService.authorizationId,
        authService: dto.authorizedService._id,
        placeService: dto.placeService,
        totalHours: dto.endTime.getHours() - dto.startTime.getHours(),
        totalUnits: dto.endTime.getHours() - dto.startTime.getHours() / dto.authorizedService.serviceId.size,
        dateOfService: dto.startDate,
        billedRate: dto.authorizedService.modifiers[0].chargeRate,
        billedAmount: 0,
        payerTotal: 0,
        balance: 0,
        location: dto.location,
        claimStatus: "NOTCLAIMED",
        invoiceStatus: "NOTINVOICED",
        status: "OPEN"
      });
      // clientPaid - transaction
      billing.billedAmount = billing.billedRate * billing.totalUnits;
      billing.payerTotal = dto.billedAmount;
      billing.balance = dto.billedAmount;
      if (dto.clientResp) billing.clientResp = dto.clientResp
      await billing.save();
      return this.sanitizer.sanitize(billing);
    }
    catch (e) {
      throw e;
    }
  }

  /** startTransaction */
  async startTransaction(dto: TransactionDto, billingId: string, session: any): Promise<BillingDto> {
    try {
      const billing = await this.model.findById({ _id: billingId }).session(session);
      this.checkBilling(billing);
      session.startTransaction()
      billing.transaction.push({
        type: dto.type, date: dto.date,
        amount: dto.amount, paymentRef: dto.paymentRef,
        creator: dto.creator, note: dto.note
      });
      billing.billedAmount -= dto.amount;
      if (dto.type == 'PAYERPAID') {
        billing.payerPaid += dto.amount
        billing.billedAmount -= dto.amount;
      }
      if (dto.type == 'CLIENTPAID') {
        billing.clientPaid += dto.amount;
      }
      if (dto.type == 'CLIENTRESP') {
        billing.payerTotal -= dto.amount
        billing.clientResp += dto.amount;
      }
      await billing.save();
      await session.commitTransaction()
      session.endSession()
      return this.sanitizer.sanitize(billing)
    }
    catch (e) {
      await session.abortTransaction()
      session.endSession()
      console.log(e)
      throw e;
    }
  }

  /** abort the transaction */
  async abortTransaction(billingId: string): Promise<BillingDto> {
    // set status to the transaction object, when aborting(void) set status void and recerve 
    const billing: any = await this.model.findById({ _id: billingId });
    this.checkBilling(billing);
    if (billing.transaction.type == 'PAYERPAID') {
      billing.payerPaid -= billing.amount
      billing.billedAmount += billing.amount;
    }
    if (billing.transaction.type == 'CLIENTPAID') {
      billing.clientPaid -= billing.amount;
    }
    if (billing.transaction.type == 'CLIENTRESP') {
      billing.payerTotal += billing.amount
      billing.clientResp -= billing.amount;
    }
    billing.transaction.status = "VOID";
    await billing.save()
    return this.sanitizer.sanitize(billing);
  }

  /** set status claimed */
  async billClaim(ids: string[]): Promise<void> {
    const bills = await this.model.update({ _id: { $in: ids } },
      { $set: { claimStatus: 'CLAIMED' } },
      { multi: true })
    if (bills.nModified === 0) {
      throw new HttpException(
        `Can't set status`,
        HttpStatus.NOT_MODIFIED,
      );
    }
  }

  /** find all bills */
  async findAll(claimStatus: string): Promise<BillingDto[]> {
    let billings = await this.model.find({ claimStatus });
    return this.sanitizer.sanitizeMany(billings);
  }

  /** find all with many ids */
  async findByIds(bills: string[], isClaimed = null): Promise<BillingDto[]> {
    let billings = await this.model.find({ _id: { $in: bills } });
    if (isClaimed) {
      billings.map(bill => {
        if (bill.claimStatus == "CLAIMED") {
          throw new HttpException(
            'Billing has already been used',
            HttpStatus.NOT_FOUND,
          );
        }
      })
    }
    return this.sanitizer.sanitizeMany(billings);
  }

  /** find bill by id */
  async findOne(_id: string): Promise<BillingDto> {
    const billing = await this.model.findById(_id).populate('authService')
      .populate('client')
      .populate('payer')
      .populate('placeService');
    this.checkBilling(billing)
    return this.sanitizer.sanitize(billing);
  }

  update(id: number, updateBillingDto: UpdateBillingDto) {
    return `This action updates a #${id} billing`;
  }

  remove(id: number) {
    return `This action removes a #${id} billing`;
  }

  /** Set billing status */
  setStatus = async (
    _id: string,
    status: string,
    userId: string
  ) => {
    // can automatically
    let [staff, billing] = await Promise.all([
      this.staffService.findById(userId),
      this.model.findById({ _id })
    ])
    billing.status = status;
    this.checkBilling(billing);
    return await billing.save();
  };

  /** Private methods */
  /** if the billing is not found, throws an exception */
  private checkBilling(billing: IBilling) {
    if (!billing) {
      throw new HttpException(
        'Billing with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
