import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostingDto, UpdatePostingDto, PostingDto } from './dto';
import { InvoiceService } from '../invoice/invoice.service';
import { Model } from 'mongoose';
import { IPosting } from './interface/posting.interface';
import { MongooseUtil } from '../util/mongoose.util';
import { PostingModel } from './posting.model';
import { IInvoice, IReceivable } from '../invoice/interface/invoice.interface';
import { BillingService } from '../billing/billing.service';
import { startSession } from 'mongoose';

@Injectable()
export class PostingService {
  constructor(
    // private readonly sanitizer: PostingSanitizer,
    private readonly invoiceService: InvoiceService,
    private readonly billingService: BillingService,
  ) {
    this.model = PostingModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IPosting>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreatePostingDto) {
    // let invoices = await this.invoiceService.findByIds(dto.invoices);
    // if (!invoices.length || invoices.length < dto.invoices.length) {
    //   throw new HttpException('Invoices with this ids was not found', HttpStatus.NOT_FOUND);
    // }
    // let invoice = await this.findLowInvoiceTotal(invoices);
    // let receivable = invoice.receivable;
    const invoice = await this.invoiceService.findOne(dto.invoice);
    let paymentAmount = dto.paymentAmount;
    let receivable;
    /** find lowest receivable by balance */
    // let receivable = await this.findLowReceivable(findInvoices[0].receivable);
    // for (let i = 0; i < invoices.length; i++) {
    //   console.log('eeeeeee');
    //   invoice = await this.findLowInvoiceTotal(invoices);
    //   if (!invoice.receivable.length) {
    //     invoices = invoices.filter((rec) => rec._id !== invoice._id);
    //     invoice = await this.findLowInvoiceTotal(invoices);

    // console.log('ppppp');
    // return await invoices[0].save();
    // }
    receivable = invoice.receivable;

    while (paymentAmount > 0) {
      console.log('uuuuuuu', receivable);

      if (!receivable.length) {
        console.log('iii');
        return await this.invoiceService.saveDoc(invoice);
      }
      const lowReceivable: any = await this.findLowReceivable(receivable);
      console.log(lowReceivable, 'lowReceivableeeeeeeeeeeeeeeeeeeee');
      if (paymentAmount >= lowReceivable.amountTotal && lowReceivable.amountTotal !== 0) {
        const receivableBalance = await this.fullPayReceivable(
          lowReceivable,
          paymentAmount,
          dto.user.id,
          invoice._id,
        );
        // console.log(receivableBalance, 'receivableBalancereceivableBalancereceivableBalance');
        paymentAmount -= receivableBalance;
        // lowReceivable.amountTotal = 0;
        // invoices[i].receivable[0].amountTotal
        // console.log(paymentAmount, 'paymentAmount', receivableBalance, 'receivableBalance');
      } else if (paymentAmount < lowReceivable.amountTotal) {
        this.partialPayReceivable(lowReceivable, paymentAmount, dto.user.id);
      }
      receivable = receivable.filter((rec) => rec._id !== lowReceivable._id);

      // const postying = new this.model({
      //   paymentType: dto.paymentType,
      //   paymentReference: dto.paymentReference,
      //   paymentDocument: dto.paymentDocument,
      //   paymentAmount: dto.paymentAmount,
      //   payer: dto.payer,
      //   invoices: dto.invoices,
      // });
      // await posting.save();
    }
    // invoices = invoices.filter((rec) => rec._id !== invoice._id);
    // }
    await this.invoiceService.saveDoc(invoice);
  }
  findAll() {
    return `This action returns all posting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} posting`;
  }

  update(id: number, updatePostingDto: UpdatePostingDto) {
    return `This action updates a #${id} posting`;
  }

  remove(id: number) {
    return `This action removes a #${id} posting`;
  }

  /** Private methods */
  /** find low receivable amount */
  async findLowReceivable(receivables): Promise<IReceivable> {
    return receivables.reduce((prev, curr) => {
      return prev.amountTotal < curr.amountTotal ? prev : curr;
    });
  }

  /** find low invoice total */
  async findLowInvoiceTotal(invoices: IInvoice[]): Promise<IInvoice> {
    return invoices.reduce((prev, curr) => {
      return prev.invoiceTotal < curr.invoiceTotal ? prev : curr;
    });
  }

  async fullPayReceivable(
    receivable,
    paymentAmount,
    userId: string,
    invoiceId: string,
  ): Promise<number> {
    console.log('sxal');
    paymentAmount -= receivable.amountTotal;
    const transactionInfo = {
      type: 'CLIENTPAID',
      date: new Date(),
      amount: receivable.amountTotal,
      paymentRef: 'chka',
      creator: userId,
      note: 'chka',
    };
    console.log(invoiceId, 'aaaaaaaaaaaaaaa');
    const session = await startSession();
    await this.invoiceService.updateReceivableAmount(
      invoiceId,
      receivable._id,
      receivable.amountTotal,
    );
    // await this.billingService.startTransaction(transactionInfo, receivable.bills[0]._id, session);
    // receivable.amountTotal = 0;
    return transactionInfo.amount;
  }
  async partialPayReceivable(receivable, paymentAmount, userId) {
    console.log('mtav');
    console.log(receivable.amountTotal, paymentAmount, 'oooo');
    console.log(receivable.amountTotal - paymentAmount);
    const transactionInfo = {
      type: 'PARTIALPAID',
      date: new Date(),
      amount: paymentAmount,
      paymentRef: 'chka',
      creator: userId,
      note: 'chka',
    };
    const session = await startSession();
    // await this.billingService.startTransaction(transactionInfo, receivable.bills[0]._id, session);
    // paymentAmount -= receivable.amountTotal;

    receivable.amountTotal = receivable.amountTotal - paymentAmount;
    console.log(receivable.amountTotal, 'aaaaa');
    return receivable.amountTotal;
  }
}
