import { model, Schema } from 'mongoose';
import { IAddress } from '.';

export const addressSchema = new Schema({
  lat: Number,
  lng: Number,
  street: String,
  city: String,
  state: String,
  country: String,
  zip: String,
  formattedAddress: String,
});

export const AddressModel = model<IAddress>('address', addressSchema);
