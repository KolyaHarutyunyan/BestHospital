import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { BillingService } from '../billing/billing.service';
import { ReceivableService } from '../receivable/receivable.service';
import { MongooseUtil } from '../util';
import { MergeClaims } from './claim.constants';
import { ClaimModel } from './claim.model';
import { ClaimDto, CreateClaimDto, GenerateClaimDto, UpdateClaimDto } from './dto';
import { ClaimSanitizer } from './interceptor/claim.interceptor';
import { IClaim } from './interface';

@Injectable()
export class ClaimService {
  constructor(
    private readonly sanitizer: ClaimSanitizer,
    private readonly billingService: BillingService,
    private readonly receivableService: ReceivableService,
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
  async generateClaims(dto: GenerateClaimDto, group: MergeClaims): Promise<any> {
    console.log(group)
    const bills = await this.billingService.findByIds(dto.bills, true);
    if (!bills.length || bills.length < dto.bills.length) {
      throw new HttpException(
        'Bills with this ids was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (group === "OFF") {
      const ids = await this.singleBill(dto.bills);
      const claims = await this.model.find({ _id: { $in: ids } }).populate('receivable');
      return this.sanitizer.sanitizeMany(claims);
    }
    if (group === "ON") {
      const ids = await this.groupBills(bills)
      const claims = await this.model.find({ _id: { $in: ids } }).populate('receivable');
      return this.sanitizer.sanitizeMany(claims);
    };
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
  async singleBill(bills: any) {
    let data = [];
    let claims = [];
    for (let i = 0; i < bills.length; i++) {
      const receivableData = {
        placeService: '61b354b67c05a231f27df3f3',
        cptCode: 50,
        totalUnits: 50,
        totalBill: 50,
        renderProvider: 50,
        dateOfService: '2021-12-17T14:07:19.470Z',
        bills: bills[i]
      }
      data.push(receivableData)
      if (i === 5) {
        const receivable = await this.receivableService.insertManyDocs(data);
        const claim = new this.model({
          client: '61b3604a7c05a231f27e00ed',
          staff: '61b34ed57c05a231f27df01b',
          funder: '61b354f77c05a231f27df422',
          totalCharge: 50,
          ammountPaid: 50,
          submittedDate: '2021-12-17T14:05:22.703Z',
          paymentRef: 'test3',
          link: 'test3',
          date: '2021-12-17T14:05:22.703Z',
          status: "PENDING",
          createdDate: '2021-12-17T14:05:22.703Z',
          receivable: receivable.map(receivable => receivable._id)
        })
        await claim.save();
        claims.push(claim._id)
        data = [];
      }
    }

    /** if the date remains generate a new claim */
    if (data.length) {
      const receivable = await this.receivableService.insertManyDocs(data);
      const claim = new this.model({
        client: '61b3604a7c05a231f27e00ed',
        staff: '61b34ed57c05a231f27df01b',
        funder: '61b354f77c05a231f27df422',
        totalCharge: 50,
        ammountPaid: 50,
        submittedDate: '2021-12-10T13:26:31.581+00:00',
        paymentRef: 'test',
        link: 'test',
        date: '2021-12-10T13:26:31.581+00:00',
        status: "PENDING",
        createdDate: '2021-12-10T13:26:31.581+00:00',
        receivable: receivable.map(receivable => receivable._id)
      })
      await claim.save();
      claims.push(claim._id)
    }

    /** set claimStatus CLAIMED */
    await this.billingService.billClaim(bills);
    return claims;
  }

  /** create claim with receivables with grouping bills */
  async groupBills(bills: any) {
    /** group the bills with client and placeService */
    const result = this.groupBy(bills, function (item) {
      return [item.client, item.placeService];
    });

    let data = [];
    let claims = [];
    for (let i = 0; i < result.length; i++) {
      const ids = [];
      if (i === 5) {
        /** if receivables more than 5 create receivables and generate a claim */
        const receivable = await this.receivableService.insertManyDocs(data);
        const claim = new this.model({
          client: '61b3604a7c05a231f27e00ed',
          staff: '61b34ed57c05a231f27df01b',
          funder: '61b354f77c05a231f27df422',
          totalCharge: 50,
          ammountPaid: 50,
          submittedDate: '2021-12-17T14:05:22.703Z',
          paymentRef: 'test3',
          link: 'test3',
          date: '2021-12-17T14:05:22.703Z',
          status: "PENDING",
          createdDate: '2021-12-17T14:05:22.703Z',
          receivable: receivable.map(receivable => receivable._id)
        })
        await claim.save();
        claims.push(claim._id)
        data = [];
      }
      for (let bill of result[i]) {
        ids.push(bill._id)
      }
      const receivableData = {
        placeService: '61b354b67c05a231f27df3f3',
        cptCode: 50,
        totalUnits: 50,
        totalBill: 50,
        renderProvider: 50,
        dateOfService: '2021-12-17T14:07:19.470Z',
        bills: ids
      }
      data.push(receivableData)
    }
    if (data.length) {
      const receivable = await this.receivableService.insertManyDocs(data);
      const claim = new this.model({
        client: '61b3604a7c05a231f27e00ed',
        staff: '61b34ed57c05a231f27df01b',
        funder: '61b354f77c05a231f27df422',
        totalCharge: 50,
        ammountPaid: 50,
        submittedDate: '2021-12-10T13:26:31.581+00:00',
        paymentRef: 'test',
        link: 'test',
        date: '2021-12-10T13:26:31.581+00:00',
        status: "PENDING",
        createdDate: '2021-12-10T13:26:31.581+00:00',
        receivable: receivable.map(receivable => receivable._id)
      })
      await claim.save();
      claims.push(claim._id)
    }

    /** set claimStatus CLAIMED */
    await this.billingService.billClaim(bills);
    return claims;

    // date of service, cpt code + modifier, place of service
    //  Client Funder appointment startDate
  }

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
