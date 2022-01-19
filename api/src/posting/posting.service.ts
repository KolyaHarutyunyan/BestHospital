import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostingDto, UpdatePostingDto, PostingDto } from './dto';
import { InvoiceService } from '../invoice/invoice.service';
import { Model } from 'mongoose';
import { IPosting } from './interface/posting.interface';
import { MongooseUtil } from '../util/mongoose.util';
import { PostingModel } from './posting.model';
import { IReceivable } from '../invoice/interface/invoice.interface';
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
    const findInvoices: any = await this.invoiceService.findByIds(dto.invoices);
    let receivables = findInvoices[0].receivable;
    if (!findInvoices.length || findInvoices.length < dto.invoices.length) {
      throw new HttpException('Invoices with this ids was not found', HttpStatus.NOT_FOUND);
    }
    let paymentAmount = dto.paymentAmount;
    /** find lowest receivable by balance */
    // let receivable = await this.findLowReceivable(findInvoices[0].receivable);
    while (paymentAmount > 0) {
      if (!receivables.length) {
        console.log('iii')
        return await findInvoices[0].save();
      }
      const lowReceivable: any = await this.findLowReceivable(findInvoices[0].receivable);
      console.log(lowReceivable.amountTotal, 'okokokokoko');
      console.log(paymentAmount, 'paymentAmount');

      if (paymentAmount >= lowReceivable.amountTotal) {
        const receivableBalance = await this.fullPayReceivable(
          lowReceivable,
          paymentAmount,
          dto.user.id,
        );
        paymentAmount -= receivableBalance;
      } else if (paymentAmount < lowReceivable.amountTotal) {
        this.partialPayReceivable(lowReceivable, paymentAmount, dto.user.id);
      }
      receivables = receivables.filter((rec) => rec._id !== lowReceivable._id);

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
    await findInvoices[0].save();
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
  async findLowReceivable(receivable): Promise<IReceivable> {
    return receivable.reduce((prev, curr) => {
      return prev.amountTotal < curr.amountTotal ? prev : curr;
    });
  }

  async fullPayReceivable(receivable, paymentAmount, userId) {
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
    const session = await startSession();
    await this.billingService.startTransaction(transactionInfo, receivable.bills[0]._id, session);
    receivable.amountTotal = 0;
    return receivable.amountTotal;
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
    await this.billingService.startTransaction(transactionInfo, receivable.bills[0]._id, session);
    // paymentAmount -= receivable.amountTotal;

    receivable.amountTotal = receivable.amountTotal - paymentAmount;
    console.log(receivable.amountTotal, 'aaaaa')
    return receivable.amountTotal;
  }
}
