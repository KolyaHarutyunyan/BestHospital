import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { BillingService } from '../billing/billing.service';
import { MongooseUtil } from '../util';
import { CreateInvoiceDto, UpdateInvoiceDto, InvoiceDto, GenerateInvoiceDto } from './dto';
import { InvoiceSanitizer } from './interceptor';
import { IInvoice } from './interface';
import { InvoiceModel } from './invoice.model';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly sanitizer: InvoiceSanitizer,
    private readonly billingService: BillingService, // private readonly receivableService: ReceivableService, // private readonly staffService: StaffService,
  ) {
    this.model = InvoiceModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IInvoice>;
  private mongooseUtil: MongooseUtil;

  /** create an invoice */
  async create(dto: CreateInvoiceDto): Promise<any> {
    return 'This action adds a new invoice';
  }

  /** generate an invoice */
  async generateInvoices(dto: GenerateInvoiceDto): Promise<any> {
    const bills: any = await this.billingService.findByIds(dto.bills, true);
    if (!bills.length || bills.length < dto.bills.length) {
      throw new HttpException('Bills with this ids was not found', HttpStatus.NOT_FOUND);
    }
    const invoices = await this.groupBills(bills);
    return invoices;
    // return this.sanitizer.sanitizeMany(claims);
  }

  /** get all invoices */
  async findAll() {
    return `This action returns all invoice`;
  }

  /** get all invoices */
  async findByIds(ids: string[]) {
    return await this.model
      .find({
        _id: { $in: ids },
      })
      .populate('receivable.bills');
  }

  /** get invoice by id */
  async findOne(_id: string) {
    return `s action returns a #${_id} invoice`;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }

  /** Private methods */
  /** create invoice with receivables with bills */
  async groupBills(bills: string[]): Promise<any> {
    let invoice = [],
      receivable = [],
      receivableCreatedAt = [],
      subBills = [];

    /** group the bills by payer and clent */
    const result = this.groupBy(bills, function (item) {
      return [item.client];
    });

    /** create receivables and invoices */
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; ++j) {
        subBills.push(result[i][j]);
        await this.addReceivable(
          receivable,
          result[i][j],
          result[i][0].placeService,
          result[i][0].authService.serviceId.cptCode,
        );
        receivableCreatedAt.push(new Date());

        if (j !== 0 && j === 5) {
          await this.addInvoice(invoice, result[i][j], receivable, receivableCreatedAt, subBills);
          subBills = [];
          receivable = [];
          receivableCreatedAt = [];
        }
      }
      if (receivable.length) {
        await this.addInvoice(invoice, result[i][0], receivable, receivableCreatedAt, subBills);
      }
      subBills = [];
      receivable = [];
      receivableCreatedAt = [];
    }
    /** set bill claimStatus to CLAIMED */
    await this.model.insertMany(invoice);
    // await this.billingService.billClaim(bills);
    return invoice;
  }

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
    });
  }

  /** add receivable */
  /** development */
  private async addReceivable(
    receivable,
    result,
    placeService: string,
    cptCode: number,
  ): Promise<void> {
    // Description - includes the appointment service name, time and staff name
    // balance - [ copay - prior paid ]

    receivable.push({
      placeService,
      cptCode,
      hours: result.totalHours,
      clientResp: result.clientPaid,
      clientPaid: result.clientPaid,
      amountTotal: result.billedAmount,
      // sum of all bills? 50
      // result[i][j].payerTotal - result[i][j].payerPaid / unitZise?
      totalUnits: 0,
      totalBill: result.payerTotal - result.payerPaid,
      dateOfService: { start: new Date(result.createdDate), end: new Date(result.createdDate) },
      // serviceDate: result.appointment.createdDate,
      createdAt: new Date(),
      bills: result._id,
    });
  }

  /** add invoice */
  private async addInvoice(
    invoice,
    result,
    receivable,
    receivableCreatedAt,
    subBills,
  ): Promise<void> {
    invoice.push({
      client: result.client,
      staff: result.staff,
      funder: result.payer,
      ammountPaid: 0,
      dateRange: {
        early: this.minMax(receivableCreatedAt)[0],
        latest: this.minMax(receivableCreatedAt)[1],
      },
      status: 'PENDING',
      invoiceTotal: subBills.reduce((a, b) => {
        return a + b.clientResp;
      }, 0),
      totalTime: subBills.reduce((a, b) => {
        return a + b.totalHours;
      }, 0),
      dueDate: '2021-12-28T07:02:16.250Z',
      downloadLink: '',
      receivable,
    });
    // console.log(subBills, 'subBillllls');
  }

  /** return min max date in date range */
  // private countInvoiceTotal(a, b) {
  //   console.log(a.clientResp, ' a.clientResp')
  //   return parseInt(a.clientResp) + parseInt(b.clientResp);
  // }

  /** return min max date in date range */
  private minMax(arr) {
    return [new Date(Math.min(...arr)), new Date(Math.max(...arr))];
  }

  /** if the invoice is not found, throws an exception */
  private checkInvoice(invoice: IInvoice) {
    if (!invoice) {
      throw new HttpException('Invoice with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}
