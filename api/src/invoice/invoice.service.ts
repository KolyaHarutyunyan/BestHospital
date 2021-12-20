import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { CreateInvoiceDto, UpdateInvoiceDto, InvoiceDto } from './dto';
import { InvoiceSanitizer } from './interceptor';
import { IInvoice } from './interface';
import { InvoiceModel } from './invoice.model';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly sanitizer: InvoiceSanitizer,
    // private readonly billingService: BillingService,
    // private readonly receivableService: ReceivableService,
    // private readonly staffService: StaffService,

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

  /** get all invoices */
  async findAll() {
    return `This action returns all invoice`;
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
  /** if the invoice is not found, throws an exception */
  private checkInvoice(invoice: IInvoice) {
    if (!invoice) {
      throw new HttpException(
        'Invoice with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
