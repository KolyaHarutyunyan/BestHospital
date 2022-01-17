import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostingDto, UpdatePostingDto, PostingDto } from './dto';
import { InvoiceService } from '../invoice/invoice.service';
import { Model } from 'mongoose';
import { IPosting } from './interface/posting.interface';
import { MongooseUtil } from '../util/mongoose.util';
import { PostingModel } from './posting.model';

@Injectable()
export class PostingService {
  constructor(
    // private readonly sanitizer: PostingSanitizer,
    private readonly invoiceService: InvoiceService,
  ) {
    this.model = PostingModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IPosting>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreatePostingDto) {
    const findInvoices = await this.invoiceService.findByIds(dto.invoices);
    if (!findInvoices.length || findInvoices.length < dto.invoices.length) {
      throw new HttpException('Invoices with this ids was not found', HttpStatus.NOT_FOUND);
    }
    console.log(findInvoices, 'invooce');
    findInvoices[0].receivable.reduce((prev, curr) => {
      return prev.Cost < curr.Cost ? prev : curr;
    });
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
}
