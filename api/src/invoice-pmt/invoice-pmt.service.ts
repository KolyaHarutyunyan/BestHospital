import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, startSession } from 'mongoose';
import { BillingDto } from 'src/billing/dto/billing.dto';
import { BillingService } from '../billing/billing.service';
import { TxnType } from '../billing/txn/txn.constants';
import { ClientService } from '../client/client.service';
import { FileService } from '../files/file.service';
import { IReceivable } from '../invoice/interface/invoice.interface';
import { InvoiceStatus } from '../invoice/invoice.constants';
import { InvoiceService } from '../invoice/invoice.service';
import { MongooseUtil } from '../util/mongoose.util';
import { CreateInvPmtDto, UpdateInvPmtDto, InvPmtDto } from './dto';
import { IInvPmt } from './interface/invoice-pmt.interface';
import { InvPmtModel } from './invoice-pmt.model';
import { InvPmtSanitizer } from './invoice-pmt.sanitizer';

@Injectable()
export class InvPmtService {
  constructor(
    private readonly sanitizer: InvPmtSanitizer,
    private readonly invoiceService: InvoiceService,
    private readonly clientService: ClientService,
    private readonly fileService: FileService,
    private readonly billingService: BillingService,
  ) {
    this.model = InvPmtModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IInvPmt>;
  private mongooseUtil: MongooseUtil;

  /** create invoice payment */
  async create(dto: CreateInvPmtDto) {
    const [invoice, client] = await Promise.all([
      this.invoiceService.findOne(dto.invoice),
      this.clientService.findById(dto.payer),
    ]);
    this.invoiceService.checkStatusInvoice(invoice.status, [InvoiceStatus.SUBMITTED]);
    let paymentAmount = dto.paymentAmount;
    let receivable = invoice.receivable;
    let payed = false;
    while (paymentAmount > 0) {
      if (!receivable.length) {
        if (!payed) {
          throw new HttpException('Invoice have not receivables', HttpStatus.NOT_FOUND);
        }
        return await this.saveDb(dto);
      }
      const lowReceivable: any = await this.findLowReceivable(receivable);
      if (paymentAmount >= lowReceivable.amountTotal && lowReceivable.amountTotal !== 0) {
        const receivableBalance = await this.fullPayReceivable(
          lowReceivable,
          paymentAmount,
          dto.user.id,
          invoice._id,
        );
        paymentAmount -= receivableBalance;
        payed = true;
      } else if (paymentAmount < lowReceivable.amountTotal) {
        const paidedAmount = await this.partialPayReceivable(
          lowReceivable,
          paymentAmount,
          dto.user.id,
          invoice._id,
        );
        paymentAmount -= paidedAmount;
        payed = true;
      }
      receivable = receivable.filter((rec) => rec._id !== lowReceivable._id);
    }
    return await this.saveDb(dto);
  }
  /** add document to invoice-pmt */
  async addDocument(_id: string, fileId: string): Promise<InvPmtDto> {
    const [invPmt, file] = await Promise.all([
      this.model.findById(_id),
      this.fileService.getOne(fileId),
    ]);
    this.checkInvPmt(invPmt);
    invPmt.documents.push(fileId);
    await invPmt.save();
    return this.sanitizer.sanitize(invPmt);
  }
  /** delete document in the posting */
  async deleteDocument(_id: string, fileId: string): Promise<InvPmtDto> {
    const invPmt = await this.model.findById(_id);
    this.checkInvPmt(invPmt);
    this.removeFromList(invPmt.documents, fileId);
    await invPmt.save();
    return this.sanitizer.sanitize(invPmt);
  }
  /** get all posting */
  async findAll(): Promise<InvPmtDto[]> {
    const invPmts = await this.model
      .find()
      .populate('documents')
      .populate({
        path: 'invoice',
        populate: {
          path: 'client',
        },
      })
      .populate('payer');
    return this.sanitizer.sanitizeMany(invPmts);
  }
  /** get one posting */
  async findOne(_id: string): Promise<InvPmtDto> {
    const invPmt = await this.model
      .findById(_id)
      .populate('documents')
      .populate({
        path: 'invoice',
        populate: {
          path: 'client',
        },
      })
      .populate('payer');
    this.checkInvPmt(invPmt);
    return this.sanitizer.sanitize(invPmt);
  }
  /** update posting */
  async update(_id: string, dto: UpdateInvPmtDto): Promise<InvPmtDto> {
    const invPmt = await this.model.findById(_id);
    this.checkInvPmt(invPmt);
    if (dto.paymentType) invPmt.paymentType = dto.paymentType;
    // When the payment type is edited, payment reference should be updated as well
    if (dto.paymentReference) invPmt.paymentReference = dto.paymentReference;
    if (dto.paymentDate) invPmt.paymentDate = dto.paymentDate;
    await invPmt.save();
    return this.sanitizer.sanitize(invPmt);
  }
  /** Private methods */
  /** find low receivable amount */
  async findLowReceivable(receivables): Promise<IReceivable> {
    return receivables.reduce((prev, curr) => {
      return prev.amountTotal < curr.amountTotal ? prev : curr;
    });
  }
  /** full receivable pay */
  async fullPayReceivable(
    receivable,
    paymentAmount,
    userId: string,
    invoiceId: string,
  ): Promise<number> {
    paymentAmount -= receivable.amountTotal;
    const transactions = [];
    receivable.bills.map((bill) => {
      const transactionInfo = {
        type: TxnType.CLIENTPAID,
        date: new Date(),
        rate: bill.billedAmount,
        paymentRef: 'chka',
        billing: bill._id,
        creator: userId,
      };
      transactions.push(this.billingService.startTransaction(transactionInfo, bill._id));
    });
    await Promise.all([
      transactions,
      this.invoiceService.updateReceivableAmount(invoiceId, receivable._id, receivable.amountTotal),
    ]);
    return receivable.amountTotal;
  }
  /** partial receivable pay */
  async partialPayReceivable(
    receivable,
    paymentAmount,
    userId,
    invoiceId: string,
  ): Promise<number> {
    let paidedAmount = 0;
    for (let i = 0; i <= receivable.bills.length; i++) {
      const lowBill: any = this.findLowBill(receivable.bills);
      if (lowBill.billedAmount === 0) {
        i = 0;
        continue;
      }
      if (!lowBill || paymentAmount === 0) {
        return paymentAmount;
      }
      if (paymentAmount >= lowBill.billedAmount) {
        const transactionInfo = {
          type: TxnType.CLIENTPAID,
          date: new Date(),
          rate: lowBill.billedAmount,
          paymentRef: 'chka',
          billing: lowBill._id,
          creator: lowBill._id,
        };
        await this.billingService.startTransaction(transactionInfo, lowBill._id);
        receivable.amountTotal -= lowBill.billedAmount;
        paymentAmount -= lowBill.billedAmount;
        paidedAmount += lowBill.billedAmount;
      } else if (paymentAmount < lowBill.billedAmount) {
        const transactionInfo = {
          type: TxnType.PAYERPAID,
          date: new Date(),
          rate: paymentAmount,
          paymentRef: 'chka',
          billing: lowBill._id,
          creator: lowBill._id,
        };
        await this.billingService.startTransaction(transactionInfo, lowBill._id);
        receivable.amountTotal -= lowBill.billedAmount;
        paidedAmount += paymentAmount;
        paymentAmount = 0;
      }
      receivable.bills = receivable.bills.filter((rec) => rec._id !== lowBill._id);
      i = 0;
    }
    await this.invoiceService.updateReceivableAmount(invoiceId, receivable._id, paidedAmount);
    return paidedAmount;
  }

  /** Private methods */
  /** if the invPmt is not found, throws an exception */
  private checkInvPmt(invPmt: IInvPmt) {
    if (!invPmt) {
      throw new HttpException('Invoice payment with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
  /** find low bill amount */
  private findLowBill(bills): Promise<BillingDto> {
    return bills.reduce((prev, curr) => {
      return prev.billedAmount < curr.billedAmount ? prev : curr;
    });
  }
  /** Removes a file from the list if the file exists */
  private removeFromList(list: any[], element: any) {
    const index = list.findIndex((id) => id == element);
    if (index !== -1) {
      list.splice(index, 1);
    } else {
      throw new HttpException('Was not found in list', HttpStatus.NOT_FOUND);
    }
  }
  /** save db */
  private async saveDb(dto) {
    /** add in array and then insert db */
    const posting = new this.model({
      paymentType: dto.paymentType,
      paymentReference: dto.paymentReference,
      paymentAmount: dto.paymentAmount,
      payer: dto.payer,
      invoice: dto.invoice,
    });
    await posting.save();
    return this.sanitizer.sanitize(posting);
  }
}
