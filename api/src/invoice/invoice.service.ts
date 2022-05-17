import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BillingService } from '../billing/billing.service';
import { MongooseUtil } from '../util';
import { CreateInvoiceDto, GenerateInvoiceDto, InvoiceDto, UpdateInvoiceDto } from './dto';
import { InvoiceSanitizer } from './interceptor';
import { IInvoice } from './interface';
import { InvoiceStatus } from './invoice.constants';
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
  /** set amountTotal to the receivable (invoice-pmt) */
  async setAmountRec(_id: string, receivableId: string, amount: number): Promise<InvoiceDto> {
    const invoice = await this.model.findById(_id);
    this.checkInvoice(invoice);
    const index = invoice.receivable.findIndex(
      (receivable) => receivable._id.toString() == receivableId.toString(),
    );
    if (index === -1) {
      throw new HttpException('Receivable was not found', HttpStatus.NOT_FOUND);
    }
    invoice.ammountPaid +=
      amount == 0
        ? invoice.receivable[index].amountTotal
        : invoice.receivable[index].amountTotal - amount;
    invoice.receivable[index].amountTotal = amount;
    await invoice.save();
    return this.sanitizer.sanitize(invoice);
  }
  /** get all invoices */
  async findAll(): Promise<InvoiceDto[]> {
    const invoices = await this.model.find();
    return this.sanitizer.sanitizeMany(invoices);
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
  async findOne(_id: string): Promise<InvoiceDto> {
    const invoice = await this.model.findById(_id).populate('receivable.bills');
    this.checkInvoice(invoice);
    return this.sanitizer.sanitize(invoice);
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }
  /** update amountTotal (posting) */
  async updateReceivableAmount(
    _id: string,
    receivableId: string,
    amount: number,
  ): Promise<InvoiceDto> {
    try {
      const invoice = await this.model.findById({ _id });
      this.checkInvoice(invoice);
      invoice.invoiceTotal -= amount;
      invoice.receivable.map((receivable) => {
        if (receivable._id.toString() === receivableId.toString()) {
          receivable.amountTotal = receivable.amountTotal - amount;
        }
      });
      if (invoice.invoiceTotal == 0) {
        invoice.status = InvoiceStatus.PAID;
      } else {
        invoice.status = InvoiceStatus.PARTIAL;
      }
      await invoice.save();
      return this.sanitizer.sanitize(invoice);
    } catch (e) {
      throw e;
    }
  }
  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
  /** Checks if the invoice status is allowed (matches an item in allowed statuses). Throws if no match is found */
  checkStatusInvoice(invoiceStatus: InvoiceStatus, allowedStatuses: InvoiceStatus[]) {
    let foundStatusMatch = false;
    for (let i = 0; i < allowedStatuses.length; i++) {
      if (invoiceStatus === allowedStatuses[i]) {
        foundStatusMatch = true;
        break;
      }
    }
    if (!foundStatusMatch) {
      throw new HttpException(
        `You can only edit invoice that are ${allowedStatuses}`,
        HttpStatus.BAD_REQUEST,
      );
    }
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
        this.addReceivable(
          receivable,
          result[i][j],
          result[i][0].placeService,
          result[i][0].authService.serviceId.cptCode,
        );
        receivableCreatedAt.push(new Date());

        if (j !== 0 && j === 5) {
          this.addInvoice(invoice, result[i][j], receivable, receivableCreatedAt, subBills);
          subBills = [];
          receivable = [];
          receivableCreatedAt = [];
        }
      }
      if (receivable.length) {
        this.addInvoice(invoice, result[i][0], receivable, receivableCreatedAt, subBills);
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
      amountTotal: result.billedAmount,
      staff: result.staff,
      clientResp: result.clientResp,
      clientPaid: result.clientPaid,
      balance: result.clientResp - result.clientPaid,
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
    let totalBilled = 0;
    let totalHours = 0;
    receivable.map((rec) => {
      totalBilled += rec.amountTotal;
      totalHours += rec.hours;
    });
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
      totalHours,
      totalBilled,
      dueDate: '2021-12-28T07:02:16.250Z',
      downloadLink: '',
      receivable,
    });
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
