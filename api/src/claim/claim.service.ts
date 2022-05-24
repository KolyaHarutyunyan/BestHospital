import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { StaffService } from '../staff/staff.service';
import { BillingService } from '../billing/billing.service';
import { MongooseUtil } from '../util';
import { ClaimStatus, MergeClaims } from './claim.constants';
import { ClaimModel } from './claim.model';
import { ClaimDto, GenerateClaimDto } from './dto';
import { ClaimSanitizer } from './interceptor/claim.interceptor';
import { IClaim } from './interface';
import { IBilling } from '../billing/interface';
import { IAuthorizationService } from '../client/authorizationservice/interface';
import { IService } from '../funding/interface';
import { IReceivable } from './interface/receivable.interface';
import { IClaimPmtCount } from 'src/claim-payment/interface/claim-pmt.interface';
@Injectable()
export class ClaimService {
  constructor(
    private readonly sanitizer: ClaimSanitizer,
    private readonly billingService: BillingService,
    private readonly staffService: StaffService,
  ) {
    this.model = ClaimModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IClaim>;
  private mongooseUtil: MongooseUtil;

  /** set amountTotal to the receivable (claim-pmt) */
  async setAmountRec(
    _id: string,
    receivableId: string,
    amount: number,
    allowedAMT: number,
    paidAMT: number,
  ): Promise<ClaimDto> {
    const claim = await this.model.findById(_id);
    this.checkClaim(claim);
    const index = claim.receivable.findIndex(
      (receivable) => receivable._id.toString() == receivableId.toString(),
    );
    if (index === -1) {
      throw new HttpException('Receivable was not found', HttpStatus.NOT_FOUND);
    }
    claim.ammountPaid +=
      amount == 0
        ? claim.receivable[index].amountTotal
        : claim.receivable[index].amountTotal - amount;
    claim.receivable[index].amountTotal = amount;
    claim.receivable[index].allowedAMT = allowedAMT;
    claim.receivable[index].paidAMT = paidAMT;

    console.log(amount, 'amount');
    await claim.save();
    return this.sanitizer.sanitize(claim);
  }
  /** update amountTotal (claim-pmt) */
  async updateReceivableAmount(
    _id: string,
    receivableId: string,
    amount: number,
  ): Promise<ClaimDto> {
    try {
      const claim = await this.model.findById({ _id });
      this.checkClaim(claim);
      claim.totalCharge -= amount;
      /** save totalAmount in receivable this is sum all bills */
      // claim.receivable.map((receivable) => {
      //   if (receivable._id.toString() === receivableId.toString()) {
      //     receivable.amountTotal = receivable.amountTotal - amount;
      //   }
      // });
      if (claim.totalCharge == 0) {
        claim.status = ClaimStatus.PAID;
      }
      claim.status = ClaimStatus.PARTIAL;
      await claim.save();
      return this.sanitizer.sanitize(claim);
    } catch (e) {
      throw e;
    }
  }
  /**generate claims */
  async generateClaims(dto: GenerateClaimDto, group: MergeClaims): Promise<ClaimDto[]> {
    const bills = await this.billingService.findByIds(dto.bills, true);
    if (!bills.length || bills.length < dto.bills.length) {
      throw new HttpException('Bills with this ids was not found', HttpStatus.NOT_FOUND);
    }
    const claims =
      group === 'OFF'
        ? await this.singleBill(bills as IBilling[])
        : await this.groupBills(bills as IBilling[]);
    return this.sanitizer.sanitizeMany(claims);
  }

  /** find all claims */
  async findAll(): Promise<ClaimDto[]> {
    const claim = await this.model.find();
    return this.sanitizer.sanitizeMany(claim);
  }

  /** find claim by id] (claim-pmt) */
  async findOne(_id: string): Promise<ClaimDto> {
    const claim = await this.model.findById(_id).populate('receivable.bills');
    this.checkClaim(claim);
    return this.sanitizer.sanitize(claim);
  }

  // update(id: number, updateClaimDto: UpdateClaimDto) {
  //   return `This action updates a #${id} claim`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} claim`;
  // }

  /** create claim with receivables with bills */
  async singleBill(bills: IBilling[]): Promise<IClaim[]> {
    const claim = [] as IClaim[];
    const billIds = [];
    let subBills = [],
      receivableCreatedAt = [],
      receivable = [];

    /** group the bills by payer and clent */
    const result = this.groupBy(bills, function (item) {
      return [item.payer, item.client];
    });

    /** create receivables and claims */
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; ++j) {
        const authorizedService = (<any>result[i][0].authService) as IAuthorizationService;
        const service = (<any>authorizedService.serviceId) as IService;

        subBills.push(result[i][j]);
        billIds.push(result[i][j]._id);
        await this.addReceivable(
          receivable,
          result[i][j],
          result[i][0].placeService,
          service.cptCode,
        );
        receivableCreatedAt.push(new Date());

        if (j !== 0 && j === 5) {
          await this.addClaim(claim, result[i][j], receivable, receivableCreatedAt, subBills);
          subBills = [];
          receivable = [];
          receivableCreatedAt = [];
        }
      }
      if (receivable.length) {
        await this.addClaim(claim, result[i][0], receivable, receivableCreatedAt, subBills);
      }
      subBills = [];
      receivable = [];
      receivableCreatedAt = [];
    }
    await Promise.all([this.model.insertMany(claim), this.billingService.billClaim(billIds)]);
    return claim;
  }

  /** create claim with receivables with grouping bills */
  async groupBills(bills: IBilling[]): Promise<IClaim[]> {
    /** group the bills with client and placeService */
    const result = this.groupBy(bills, function (item) {
      return [item.payer, item.client];
    });
    const claim = [] as IClaim[],
      billIds = [],
      bill = [],
      groupBill = [],
      receivableCreatedAt = [];

    let subBills = [],
      billCreatedAt = [],
      receivable = [],
      totalBilled = 0,
      subBillIds = [];

    for (let i = 0; i < result.length; i++) {
      result[i].map((bills) => {
        bill.push(bills._id);
        groupBill.push(bills);
      });
    }
    const billGroup = this.groupBy(groupBill, function (item) {
      return [item.placeService, item.authService._id];
    });
    for (let i = 0; i < billGroup.length; i++) {
      billGroup[i].map((bill) => {
        billIds.push(bill._id);
        subBillIds.push(bill._id);
        billCreatedAt.push(bill.createdDate);
        totalBilled += bill.billedAmount;
        subBills.push(bill);
      });
      const dateRange = this.minMax(billCreatedAt) as Date[];
      await this.addReceivables(
        receivable,
        billGroup[i][0],
        subBillIds,
        subBills,
        totalBilled,
        dateRange,
      );
      receivableCreatedAt.push(new Date());
      await this.addClaim(claim, billGroup[i][0], receivable, receivableCreatedAt, subBills);
      subBillIds = [];
      subBills = [];
      receivable = [];
      billCreatedAt = [];
    }
    /** set bill claimStatus to CLAIMED */
    await Promise.all([this.model.insertMany(claim), this.billingService.billClaim(billIds)]);
    return claim;
    // date of service, cpt code + modifier, place of service
    //  Client Funder appointment startDate
  }

  /** close the claim */
  closeClaim = async (_id: string, details: string): Promise<string> => {
    const claim = await this.model.updateOne(
      { _id },
      { $set: { status: ClaimStatus.CLOSED, details } },
    );
    if (claim.nModified) {
      return _id;
    }
    throw new HttpException('claim was not found', HttpStatus.NOT_FOUND);
  };
  /** change receivable amount total by receivabelId (claim-pmt) */
  async setAmount(_id: string, receivableIds: string[]) {
    const claim = await this.model.findById(_id).populate('receivable.bills');
    this.checkClaim(claim);
    let receivabelTotal = 0;
    receivableIds.map((receivable) => {
      const index = claim.receivable.findIndex(
        (claimReceivable) => claimReceivable._id == receivable,
      );
      claim.receivable[index].bills.map((bill: any) => {
        receivabelTotal += bill.billedAmount;
      });
      claim.receivable[index].amountTotal = receivabelTotal;
    });
    await claim.save();
  }

  /** add receivable */
  private async addReceivable(
    receivable,
    billing: IBilling,
    placeService: string,
    cptCode: string,
  ): Promise<void> {
    receivable.push({
      placeService,
      cptCode,
      amountTotal: billing.billedAmount,
      clientResp: billing.clientResp,
      // result[i][j].payerTotal - result[i][j].payerPaid / unitZise?
      totalUnits: 0,
      totalBill: billing.payerTotal - billing.payerPaid,
      dateOfService: { start: new Date(billing.createdDate), end: new Date(billing.createdDate) },
      createdAt: new Date(),
      bills: billing._id,
    });
  }

  /** add many receivables */
  private async addReceivables(
    receivable,
    billGroup: IBilling,
    subBillIds: string[],
    subBills: IBilling[],
    totalBilled: number,
    dateRange: Date[],
  ): Promise<void> {
    const authorizedService = (<any>billGroup.authService) as IAuthorizationService;
    const service = (<any>authorizedService.serviceId) as IService;
    let clientResp = 0;
    subBills.map((bill) => (clientResp += bill.clientResp));
    receivable.push({
      placeService: billGroup.placeService,
      cptCode: service.cptCode,
      clientResp,
      totalUnits: 0,
      amountTotal: totalBilled,
      // bills can have different fundingService so (payor total - payor paid / fundingService(unitSize)) which fundingService(unit size)
      totalBill: await this.countTotalBills(subBills),
      renderProvider: 50,
      dateOfService: { start: dateRange[0], end: dateRange[1] },
      bills: subBillIds,
    });
  }

  /** add claim */
  private async addClaim(
    claim,
    result: IBilling,
    receivable: IReceivable[],
    receivableCreatedAt: Date[],
    subBills: IBilling[],
  ): Promise<void> {
    let totalBilled = 0;
    receivable.map((rec) => (totalBilled += rec.amountTotal));
    claim.push({
      client: result.client,
      staff: result.staff,
      funder: result.payer,
      ammountPaid: 0,
      totalCharge: await this.countTotalCharge(subBills),
      totalBilled,
      dateRange: {
        early: this.minMax(receivableCreatedAt)[0],
        latest: this.minMax(receivableCreatedAt)[1],
      },
      status: ClaimStatus.PENDING,
      paymentRef: 'chupulupu',
      receivable,
    });
  }
  /** Private methods */
  /** group the bills */
  private groupBy(array, f): IBilling[][] {
    const groups = {};
    array.forEach(function (o) {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }

  /** count the total billed amount */
  private async countTotalBills(bills: IBilling[]): Promise<number> {
    let sum = 0;
    for (let i = 0; i < bills.length - 1; i++) {
      sum +=
        bills[i].payerTotal -
        bills[i].payerPaid +
        (bills[i + 1].payerTotal - bills[i + 1].payerPaid);
      i++;
    }
    return sum;
  }

  /** count the total charge */
  private async countTotalCharge(bills: IBilling[]): Promise<number> {
    let totalCharge = 0;
    for (let i = 0; i < bills.length; i++) {
      totalCharge += bills[i].billedAmount - bills[i].payerTotal - bills[i].clientResp;
    }
    return totalCharge;
  }

  /** return min max date in date range */
  private minMax(arr): Date[] {
    return [new Date(Math.min(...arr)), new Date(Math.max(...arr))];
  }

  /** if the claim is not found, throws an exception */
  private checkClaim(claim: IClaim) {
    if (!claim) {
      throw new HttpException('Claim with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}
