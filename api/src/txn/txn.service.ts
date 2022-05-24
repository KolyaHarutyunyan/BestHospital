import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ITxn } from './interface';
import { TxnModel } from './txn.model';
import { MongooseUtil } from '../util';
import { TxnStatus } from './txn.constants';
import { TxnDto } from './dto';
import { TxnSanitizer } from './txn.sanitizer';

@Injectable()
export class TxnService {
  constructor(private readonly sanitizer: TxnSanitizer) {
    this.model = TxnModel;
  }
  private model: Model<ITxn>;

  /** create transaction */
  async create(dto: TxnDto): Promise<ITxn> {
    const transaction = new this.model({
      billing: dto.billing,
      type: dto.type,
      rate: dto.rate,
      date: dto.date,
      paymentRef: dto.paymentRef,
      // creator: dto.user.id,
      note: dto.note ? dto.note : undefined,
      status: TxnStatus.APPLIED,
    });
    await transaction.save();
    return transaction._id;
  }

  /** void transaction */
  async void(billingId: string, _id: string, userId: string): Promise<ITxn> {
    const transaction = await this.model.findOneAndUpdate(
      { _id, billing: billingId, creator: userId },
      { $set: { status: TxnStatus.VOID } },
    );
    this.checkTsx(transaction);
    return transaction;
  }
  /** get transactions by billingId */
  async getByBilling(billingId: string, skip: number, limit: number): Promise<any> {
    skip ? skip : (skip = 0);
    limit ? limit : (limit = 10);
    const transaction = await this.model.find({ billing: billingId }).skip(skip).limit(limit);
    const transactionCount = await this.model.find({ billing: billingId });
    return { data: transaction, count: transactionCount.length };
  }
  /** get transactions by billingId */
  async getById(_id: string): Promise<TxnDto> {
    const txn = await this.model.findById({ _id });
    this.checkTsx(txn);
    return this.sanitizer.sanitize(txn);
  }
  /** Private Methods */
  private checkTsx(tsx: ITxn) {
    if (!tsx) {
      throw new HttpException('Transaction was not found', HttpStatus.NOT_FOUND);
    }
  }
}
