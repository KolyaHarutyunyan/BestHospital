import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { StaffService } from '../staff/staff.service';
import { BillingService } from '../billing/billing.service';
import { MongooseUtil } from '../util';
import { MergeClaims } from './claim.constants';
import { ClaimModel } from './claim.model';
import { ClaimDto, CreateClaimDto, GenerateClaimDto, UpdateClaimDto } from './dto';
import { ClaimSanitizer } from './interceptor/claim.interceptor';
import { IClaim } from './interface';
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
    let claim = [];
    let receivable = [];
    const result = this.groupBy(bills, function (item) {
      return [item.client, item.placeService];
    });

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; ++j) {
        console.log(j)
        receivable.push({
          placeService: '61b354b67c05a231f27df3f3',
          cptCode: 50,
          totalUnits: 50,
          totalBill: 50,
          renderProvider: 50,
          dateOfService: '2021-12-17T14:07:19.470Z',
          bills: result[i][j]._id
        })
        if(j !== 0 && j === 5){
          claim.push({
            client: result[i].client,
            staff: result[i].staff,
            funder: result[i].payer,
            totalCharge: 0,
            ammountPaid: 0,
            submittedDate: '2021-12-10T13:26:31.581+00:00',
            paymentRef: 'test',
            link: 'testiiiiiiiik',
            date: '2021-12-10T13:26:31.581+00:00',
            status: "PENDING",
            createdDate: '2021-12-10T13:26:31.581+00:00',
            receivable
          })
          receivable = [];
        }
      }
      claim.push({
        client: result[i].client,
        staff: result[i].staff,
        funder: result[i].payer,
        totalCharge: 0,
        ammountPaid: 0,
        submittedDate: '2021-12-10T13:26:31.581+00:00',
        paymentRef: 'test',
        link: 'test',
        date: '2021-12-10T13:26:31.581+00:00',
        status: "PENDING",
        createdDate: '2021-12-10T13:26:31.581+00:00',
        receivable
      })
      receivable = [];
    }

    /** set bill claimStatus to CLAIMED */
    await this.model.insertMany(claim)
    await this.billingService.billClaim(bills);
    return claim
  }

  /** create claim with receivables with grouping bills */
  async groupBills(bills: any): Promise<IClaim[]> {
    /** group the bills with client and placeService */
    const result = this.groupBy(bills, function (item) {
      return [item.client, item.placeService];
    });
    let claim = [];
    let receivable = [];
    let bill = [];
    for (let i = 0; i < result.length; i++) {
      result[i].map(bills => {
        bill.push(bills._id);
      })
      receivable.push({
        placeService: '61b354b67c05a231f27df3f3',
        cptCode: 50,
        totalUnits: 50,
        totalBill: 50,
        renderProvider: 50,
        dateOfService: '2021-12-17T14:07:19.470Z',
        bills: bill
      })
      
      claim.push({
        client: result[i].client,
        staff: result[i].staff,
        funder: result[i].payer,
        totalCharge: 0,
        ammountPaid: 0,
        submittedDate: '2021-12-10T13:26:31.581+00:00',
        paymentRef: 'test',
        link: 'test',
        date: '2021-12-10T13:26:31.581+00:00',
        status: "PENDING",
        createdDate: '2021-12-10T13:26:31.581+00:00',
        receivable
      })
      bill = [];
      receivable = [];
    }
 

    /** set bill claimStatus to CLAIMED */
    await this.model.insertMany(claim);
    await this.billingService.billClaim(bills);
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
