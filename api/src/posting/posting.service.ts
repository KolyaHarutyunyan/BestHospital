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
    if (!findInvoices.length || findInvoices.length < dto.invoices.length) {
      throw new HttpException('Invoices with this ids was not found', HttpStatus.NOT_FOUND);
    }
    let paymentAmount = dto.paymentAmount;
    /** find lowest receivable by balance */
    // let receivable = await this.findLowReceivable(findInvoices[0].receivable);
    while (paymentAmount > 0) {
      // console.log(findInvoices[0].receivable, 'findInvoices[0].receivable');
      if (!findInvoices[0].receivable.length) {
        return;
      }
      const lowReceivable: any = await this.findLowReceivable(findInvoices[0].receivable);

      if (paymentAmount >= lowReceivable.balance) {
        console.log(paymentAmount, 'paymentAmount');

        const receivableBalance = await this.fullPayReceivable(
          lowReceivable,
          paymentAmount,
          dto.user.id,
        );
        paymentAmount -= receivableBalance;
        findInvoices[0].receivable = findInvoices[0].receivable.filter(
          (rec) => rec._id !== lowReceivable._id,
        );
      } else if (paymentAmount <= lowReceivable.balance) {
        return;
        this.partialPayReceivable(lowReceivable, paymentAmount, dto.user.id);
      }

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
      return prev.balance < curr.balance ? prev : curr;
    });
  }

  async fullPayReceivable(receivable, paymentAmount, userId) {
    paymentAmount -= receivable.balance;
    console.log(paymentAmount, 'nerdrvac');
    const transactionInfo = {
      type: 'CLIENTPAID',
      date: new Date(),
      amount: receivable.balance,
      paymentRef: 'chka',
      creator: userId,
      note: 'chka',
    };
    const session = await startSession();
    await this.billingService.startTransaction(transactionInfo, receivable.bills[0]._id, session);
    return receivable.balance;
  }
  async partialPayReceivable(receivable, amount, userId) {}
}
