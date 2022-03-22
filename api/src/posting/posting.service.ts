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
import { ClientService } from '../client/client.service';
import { PostingSanitizer } from './posting.sanitizer';
import { InvoiceStatus } from '../invoice/invoice.constants';

@Injectable()
export class PostingService {
  constructor(
    private readonly sanitizer: PostingSanitizer,
    private readonly invoiceService: InvoiceService,
    private readonly clientService: ClientService,
    private readonly billingService: BillingService,
  ) {
    this.model = PostingModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IPosting>;
  private mongooseUtil: MongooseUtil;

  /** create invoice payment */
  async create(dto: CreatePostingDto) {
    const [invoice, client] = await Promise.all([
      this.invoiceService.findOne(dto.invoice),
      this.clientService.findById(dto.payer),
    ]);
    if (invoice.status !== InvoiceStatus.SUBMITTED) {
      throw new HttpException('Invoice must be submitted', HttpStatus.BAD_REQUEST);
    }
    let paymentAmount = dto.paymentAmount;
    let receivable = invoice.receivable;
    let payed = false;
    while (paymentAmount > 0) {
      if (!receivable.length) {
        if (!payed) {
          throw new HttpException('Invoice with this amount was not found', HttpStatus.NOT_FOUND);
        }
        const posting = new this.model({
          paymentType: dto.paymentType,
          paymentReference: dto.paymentReference,
          paymentDocument: dto.paymentDocument,
          paymentAmount: paymentAmount,
          payer: client.id,
          invoice: dto.invoice,
        });
        await posting.save();
        return this.sanitizer.sanitize(posting);
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
        this.partialPayReceivable(lowReceivable, paymentAmount, dto.user.id, invoice._id);
        payed = true;
      }
      receivable = receivable.filter((rec) => rec._id !== lowReceivable._id);
    }
  }
  /** add document to posting */
  async addDocument(_id: string, fileId: string): Promise<PostingDto> {
    const posting = await this.model.findById(_id);
    this.checkPosting(posting);
    posting.documents.push(fileId);
    await posting.save();
    return this.sanitizer.sanitize(posting);
  }
  /** delete document in the posting */
  async deleteDocument(_id: string, fileId: string): Promise<PostingDto> {
    const posting = await this.model.findById(_id);
    this.checkPosting(posting);
    this.removeFromList(posting.documents, fileId);
    await posting.save();
    return this.sanitizer.sanitize(posting);
  }
  /** get all posting */
  async findAll(): Promise<PostingDto[]> {
    const postings = await this.model.find();
    return this.sanitizer.sanitizeMany(postings);
  }
  /** get one posting */
  async findOne(_id: string): Promise<PostingDto> {
    const posting = await this.model.findById(_id);
    this.checkPosting(posting);
    return this.sanitizer.sanitize(posting);
  }
  /** update posting */
  async update(_id: string, dto: UpdatePostingDto): Promise<PostingDto> {
    const posting = await this.model.findById(_id);
    this.checkPosting(posting);
    if (dto.paymentType) posting.paymentType = dto.paymentType;
    // When the payment type is edited, payment reference should be updated as well
    if (dto.paymentReference) posting.paymentReference = dto.paymentReference;
    if (dto.paymentDate) posting.paymentDate = dto.paymentDate;
    await posting.save();
    return this.sanitizer.sanitize(posting);
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
    const transactionInfo = {
      type: 'CLIENTPAID',
      date: new Date(),
      amount: receivable.amountTotal,
      paymentRef: 'chka',
      creator: userId,
      note: 'chka',
    };
    const session = await startSession();
    await this.invoiceService.updateReceivableAmount(
      invoiceId,
      receivable._id,
      receivable.amountTotal,
    );
    // await this.billingService.startTransaction(transactionInfo, receivable.bills[0]._id, session);
    return transactionInfo.amount;
  }
  /** partial receivable pay */
  async partialPayReceivable(
    receivable,
    paymentAmount,
    userId,
    invoiceId: string,
  ): Promise<number> {
    const transactionInfo = {
      type: 'PARTIALPAID',
      date: new Date(),
      amount: paymentAmount,
      paymentRef: 'chka',
      creator: userId,
      note: 'chka',
    };
    const session = await startSession();
    await this.invoiceService.updateReceivableAmount(invoiceId, receivable._id, paymentAmount);
    // await this.billingService.startTransaction(transactionInfo, receivable.bills[0]._id, session);
    paymentAmount = receivable.amountTotal - paymentAmount;
    return receivable.amountTotal;
  }

  /** Private methods */
  /** if the posting is not found, throws an exception */
  private checkPosting(posting: IPosting) {
    if (!posting) {
      throw new HttpException('Posting with this id was not found', HttpStatus.NOT_FOUND);
    }
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
}
