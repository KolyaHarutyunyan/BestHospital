import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ITransaction } from './interface';
import { TransactionModel } from './transaction.model';
import { MongooseUtil } from '../../util';
import { TransactionStatus } from './transaction.constants';
import { TransactionDto } from './dto';

@Injectable()
export class TransactionService {
  constructor() {
    this.model = TransactionModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<ITransaction>;
  private mongooseUtil: MongooseUtil;

  /** create transaction */
  async create(dto: TransactionDto): Promise<ITransaction> {
    const transaction = new this.model({
      billing: dto.billing,
      type: dto.type,
      rate: dto.rate,
      date: dto.date,
      paymentRef: dto.paymentRef,
      creator: dto.user.id,
      note: dto.note,
      status: TransactionStatus.APPLIED,
    });
    await transaction.save();
    return transaction._id;
  }

  /** void transaction */
  async void(billingId: string, _id: string, userId: string): Promise<ITransaction> {
    const transaction = await this.model.findOneAndUpdate(
      { _id, billing: billingId, creator: userId },
      { $set: { status: TransactionStatus.VOID } },
    );
    this.checkTsx(transaction);
    return transaction;
  }

  /** Private Methods */
  private checkTsx(tsx: ITransaction) {
    if (!tsx) {
      throw new HttpException('Transaction was not found', HttpStatus.NOT_FOUND);
    }
  }
}
