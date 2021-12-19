import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { PlaceService } from '../place/place.service';
import { MongooseUtil } from '../util';
import { CreateReceivableDto, ReceivableDto, UpdateReceivableDto } from './dto';
import { ReceivableSanitizer } from './interceptor';
import { IReceivable } from './interface';
import { ReceivableModel } from './receivable.model';

@Injectable()
export class ReceivableService {
  constructor(
    private readonly sanitizer: ReceivableSanitizer,
    private readonly placeService: PlaceService,
  ) {
    this.model = ReceivableModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IReceivable>;
  private mongooseUtil: MongooseUtil;

  /** Create the receivable */
  async create(dto: CreateReceivableDto): Promise<ReceivableDto> {
    const place = await this.placeService.findOne(dto.placeService);
    const placeId = place._id as string;
    let receivable = new this.model({
      placeService: placeId,
      cptCode: dto.cptCode,
      totalUnits: dto.totalUnits,
      totalBill: dto.totalBill,
      renderProvider: dto.totalBill,
      dateOfService: dto.dateOfService,
      bills: dto.bills
    })
    // BillingSanitizer.push()
    await receivable.save();
    return this.sanitizer.sanitize(receivable)
  }

  /** Insert many documents */
  async insertManyDocs(dto: CreateReceivableDto[]): Promise<ReceivableDto[]> {
    // const place = await this.placeService.findOne(dto.placeService);
    // const placeId = place._id as string;
    // let receivable = new this.model({
    //   placeService: placeId,
    //   cptCode: dto.cptCode,
    //   totalUnits: dto.totalUnits,
    //   totalBill: dto.totalBill,
    //   renderProvider: dto.totalBill,
    //   dateOfService: dto.dateOfService,
    //   bills: dto.bills
    // })
    // // BillingSanitizer.push()
    // await receivable.save();
    const receivables = await this.model.insertMany(dto);
    return this.sanitizer.sanitizeMany(receivables)
  }

  /**find all receivables */
  async findAll(): Promise<ReceivableDto[]> {
    const receivables = await this.model.find();
    return this.sanitizer.sanitizeMany(receivables);
  }

  /** find receivable by id */
  async findOne(_id: string): Promise<ReceivableDto> {
    const receivable = await this.model.findById(_id);
    this.checkReceivable(receivable);
    return this.sanitizer.sanitize(receivable);
  }

  update(id: number, updateReceivableDto: UpdateReceivableDto) {
    return `This action updates a #${id} receivable`;
  }

  remove(id: number) {
    return `This action removes a #${id} receivable`;
  }

  /** Private methods */
  /** if the place is not found, throws an exception */
  private checkReceivable(receivable: IReceivable) {
    if (!receivable) {
      throw new HttpException(
        'Receivable with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
