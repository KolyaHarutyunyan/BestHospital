import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ITxn } from './interface';
import { TxnModel } from './txn.model';
import { MongooseUtil } from '../../util';
import { TxnStatus } from './txn.constants';
import { TxnDto } from './dto';

@Injectable()
export class TxnService {
  constructor() {
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

  /** Private Methods */
  private checkTsx(tsx: ITxn) {
    if (!tsx) {
      throw new HttpException('Transaction was not found', HttpStatus.NOT_FOUND);
    }
  }
}
