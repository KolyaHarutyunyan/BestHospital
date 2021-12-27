import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { StaffService } from '../staff/staff.service';
import { BillingService } from '../billing/billing.service';
import { MongooseUtil } from '../util';
import { MergeClaims } from './claim.constants';
import { ClaimModel } from './claim.model';
import { ClaimDto, CreateClaimDto, GenerateClaimDto, UpdateClaimDto } from './dto';
import { ClaimSanitizer } from './interceptor/claim.interceptor';
import { IClaim, IReceivable } from './interface';
import { IBilling } from '../billing/interface';

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

  /** create the claim */
  async create(dto: CreateClaimDto): Promise<ClaimDto> {
    const claim = new this.model({

    })
    await claim.save();
    return this.sanitizer.sanitize(claim);
  }

  /**generate claims */
  async generateClaims(dto: GenerateClaimDto, group: MergeClaims): Promise<ClaimDto[]> {
    const bills: any = await this.billingService.findByIds(dto.bills, true);
    if (!bills.length || bills.length < dto.bills.length) {
      throw new HttpException(
        'Bills with this ids was not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const claims = group === "OFF" ? await this.singleBill(bills) : await this.groupBills(bills);
    return this.sanitizer.sanitizeMany(claims);
  }

  /** find all claims */
  async findAll(): Promise<ClaimDto[]> {
    const claim = await this.model.find();
    return this.sanitizer.sanitizeMany(claim);
  }

  /** find claim by id] */
  async findOne(_id: string): Promise<ClaimDto> {
    const claim = await this.model.findById(_id);
    this.checkClaim(claim)
    return this.sanitizer.sanitize(claim)
  }

  update(id: number, updateClaimDto: UpdateClaimDto) {
    return `This action updates a #${id} claim`;
  }

  remove(id: number) {
    return `This action removes a #${id} claim`;
  }

  /** create claim with receivables with bills */
  async singleBill(bills: string[]): Promise<IClaim[]> {
    let claim = [], receivable = [], receivableCreatedAt = [], subBills = [];

    /** group the bills by payer and clent */
    const result = this.groupBy(bills, function (item) {
      return [item.payer, item.client];
    });

    /** create receivables and claims */
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; ++j) {
        // billCreatedAt.push(result[i][j].createdDate)
        // const dateRange = this.minMax(billCreatedAt);

        subBills.push(result[i][j]);
        await this.addReceivable(receivable, result[i][j], result[i][0].placeService, result[i][0].authService.serviceId.cptCode);
        receivableCreatedAt.push(new Date())

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

    /** set bill claimStatus to CLAIMED */
    await this.model.insertMany(claim)
    // await this.billingService.billClaim(bills);
    return claim;
  }

  /** create claim with receivables with grouping bills */
  async groupBills(bills: any): Promise<IClaim[]> {
    /** group the bills with client and placeService */
    const result = this.groupBy(bills, function (item) {
      return [item.payer, item.client];
    });
    let claim = [], receivable = [],
      bill = [], billCreatedAt = [],
      groupBill = [], subBills = [], testBill = [],
      totalBillCharge = [], receivableCreatedAt = [];

    for (let i = 0; i < result.length; i++) {
      result[i].map(bills => {
        bill.push(bills._id);
        groupBill.push(bills)
      })
    }
    const billGroup = this.groupBy(groupBill, function (item) {
      return [item.placeService, item.authService.serviceId.cptCode];
    });
    for (let i = 0; i < billGroup.length; i++) {
      billGroup[i].map(bill => {
        testBill.push(bill._id);
        totalBillCharge.push(bill);
        billCreatedAt.push(bill.createdDate);
        subBills.push(bill)
      })
      const dateRange = this.minMax(billCreatedAt);
      await this.addReceivables(receivable, billGroup[i][0], testBill, subBills, dateRange);
      receivableCreatedAt.push(new Date())
      await this.addClaim(claim, billGroup[i][0], receivable, receivableCreatedAt, subBills);
      testBill = [];
      subBills = [];
      receivable = [];
      billCreatedAt = []
    }
    /** set bill claimStatus to CLAIMED */
    await this.model.insertMany(claim);
    // await this.billingService.billClaim(bills);
    return claim;
    // date of service, cpt code + modifier, place of service
    //  Client Funder appointment startDate
  }

  /** Set claim status */
  setStatus = async (
    _id: string,
    status: string,
    userId: string,
    details: string
  ) => {
    let [staff, claim] = await Promise.all([
      this.staffService.findById(userId),
      this.model.findById({ _id })
    ])
    if (status === "SUBMITTED") claim.submittedDate = new Date()
    claim.status = status;
    if (details) {
      claim.details = details
    } else {
      claim.details = ''
    };
    this.checkClaim(claim);
    return await claim.save();
  };

  /** Private methods */
  /** group the bills */
  private groupBy(array, f) {
    var groups = {};
    array.forEach(function (o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    })
  }

  /** add receivable */
  private async addReceivable(receivable, result, placeService: string, cptCode: number): Promise<void> {
    receivable.push({
      placeService,
      cptCode,
      // result[i][j].payerTotal - result[i][j].payerPaid / unitZise?
      totalUnits: 0,
      totalBill: result.payerTotal - result.payerPaid,
      dateOfService: { start: new Date(result.createdDate), end: new Date(result.createdDate) },
      createdAt: new Date(),
      bills: result._id
    })
  }

  /** add many receivables */
  private async addReceivables(receivable, billGroup, bills, subBills, dateRange): Promise<void> {
    receivable.push({
      placeService: billGroup.placeService,
      cptCode: billGroup.authService.serviceId.cptCode,
      totalUnits: 0,
      // bills can have different fundingService so (payor total - payor paid / fundingService(unitSize)) which fundingService(unit size)
      totalBill: await this.countTotalBills(subBills),
      renderProvider: 50,
      dateOfService: { start: dateRange[0], end: dateRange[1] },
      bills
    })
  }

  /** add claim */
  private async addClaim(claim, result, receivable, receivableCreatedAt, subBills): Promise<void> {
    claim.push({
      client: result.client,
      staff: result.staff,
      funder: result.payer,
      ammountPaid: 0,
      totalCharge: await this.countTotalCharge(subBills),
      dateRange: { early: this.minMax(receivableCreatedAt)[0], latest: this.minMax(receivableCreatedAt)[1] },
      status: "PENDING",
      receivable
    })
  }

  /** count the total billed amount */
  private async countTotalBills(bills: IBilling[]): Promise<number> {
    let sum : number = 0;
    for (let i = 0; i < bills.length - 1; i++) {
      sum += (bills[i].payerTotal - bills[i].payerPaid) + (bills[i + 1].payerTotal - bills[i + 1].payerPaid);
      i++;
    }
    return sum;
  }

  /** count the total charge */
  private async countTotalCharge(bills: IBilling[]): Promise<number> {
    let totalCharge: number = 0;
    for (let i = 0; i < bills.length; i++) {
      totalCharge += (bills[i].billedAmount - bills[i].payerTotal - bills[i].clientResp);
    }
    return totalCharge;
  }

  /** return min max date in date range */
  private minMax(arr) {
    return [new Date(Math.min(...arr)), new Date(Math.max(...arr))];
  }

  /** if the claim is not found, throws an exception */
  private checkClaim(claim: IClaim) {
    if (!claim) {
      throw new HttpException(
        'Claim with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
