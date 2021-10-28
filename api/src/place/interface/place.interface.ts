import { Document } from 'mongoose';
import { ITermination } from '../../termination/interface';

export interface IPlace extends Document {
    id: string;
    name: string;
    code: string
}
