import { model, Schema } from 'mongoose';
import { IPlace } from './interface/place.interface';

const Placechema = new Schema({
  name: { type: String },
  code: { type: String },
});

export const PlaceModel = model<IPlace>('Place', Placechema);
