import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util';
import { PlaceDTO, CreatePlaceDto, UpdatePlaceDto } from './dto';
import { PlaceSanitizer } from './interceptor/place.interceptor';
import { IPlace } from './interface/place.interface';
import { PlaceModel } from './place.model';

@Injectable()
export class PlaceService {
  constructor(
    private readonly sanitizer: PlaceSanitizer,
  ) {
    this.model = PlaceModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IPlace>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreatePlaceDto): Promise<PlaceDTO> {
    try {
      const place = new this.model({
        name: dto.name,
        code: dto.code
      })
      await place.save()
      return this.sanitizer.sanitize(place)
    }
    catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Place already exists');
      throw e;
    }
  }

  async findAll(): Promise<PlaceDTO[]> {
    const places = await this.model.find();
    this.checkPlace(places[0]);
    return this.sanitizer.sanitizeMany(places);
  }

  async findOne(_id: string): Promise<PlaceDTO> {
    const place = await this.model.findById(_id);
    this.checkPlace(place)
    return this.sanitizer.sanitize(place)

  }

  async update(_id: string, dto: UpdatePlaceDto): Promise<PlaceDTO> {
    const place = await this.model.findById(_id);
    this.checkPlace(place);
    if (dto.name) place.name = dto.name;
    if (dto.code) place.code = dto.code;
    await place.save();
    return this.sanitizer.sanitize(place);
  }

  async remove(_id: string): Promise<String> {
    const place = await this.model.findByIdAndDelete(_id);
    this.checkPlace(place);
    return place._id;
  }

  /** Private methods */
  /** if the place is not found, throws an exception */
  private checkPlace(place: IPlace) {
    if (!place) {
      throw new HttpException(
        'Place with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
