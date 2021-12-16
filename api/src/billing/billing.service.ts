import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util/mongoose.util';
import { BillingModel } from './billing.model';
import { IBilling } from './interface';
import { CreateBillingDto, UpdateBillingDto, BillingDto, TransactionDto } from './dto';
import { StaffService } from '../staff/staff.service';

@Injectable()
export class BillingService {
  constructor(
    // private readonly sanitizer: BillingSanitizer,
    private readonly staffService: StaffService,
  ) {
    this.model = BillingModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IBilling>;
  private mongooseUtil: MongooseUtil;

  /** create the billing */
  async create(dto: any): Promise<any> {
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
      return billing;
    }
    catch (e) {
      throw e;
    }
  }
  /** startTransaction */
  async startTransaction(dto: TransactionDto, billingId: string, session: any): Promise<any> {
    try {
      const billing = await this.model.findById({ _id: billingId }).session(session);
      this.checkBilling(billing);
      session.startTransaction()
      billing.transaction.push({ type: dto.type, date: dto.date, amount: dto.amount, paymentRef: dto.paymentRef, creator: dto.creator, note: dto.note });
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
      return 'This action adds a new billing';
    }
    catch (e) {
      await session.abortTransaction()
      session.endSession()
      console.log(e)
      throw e;
    }
  }

  /** abort the transaction */
  async abortTransaction(billingId: string): Promise<any> {
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
    return billing;
  }

  /** find all bills */
  async findAll(): Promise<any> {
    let billings = await this.model.find();
    return billings;
  }

  async findOne(_id: string): Promise<any> {
    const billing = await this.model.findById(_id).populate('authService').populate('client').populate('payer').populate('placeService');
    this.checkBilling(billing)
    return billing;
    //     Id, 
    // Date - this will be the date of service and time ( e.g. 11/21/22 11:45a-1:30p)
    // Payer - the funding source name
    // Client - the client name
    // Providers - this is the staff members
    // Service - the service CPT code, Modifier pair (e.g. H1121 (HM) )
    // Location - the location for the appt. Display code and name (e.g. 12:home)
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
    await billing.save();
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
// cptCode Client Funder appointment startDate