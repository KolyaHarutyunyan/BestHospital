import { model, Schema } from 'mongoose';
import { IJob } from './interface';

const JobSchema = new Schema({
    name: { type: String },
});

export const JobModel = model<IJob>('Job', JobSchema);
