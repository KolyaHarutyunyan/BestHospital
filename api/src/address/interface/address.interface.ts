import { Document } from 'mongoose';
export interface IAddress extends Document {
  lat: number;
  lng: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  formattedAddress: string;
}
