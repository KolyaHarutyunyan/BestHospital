// import { model, Schema, Types } from 'mongoose';
// import { IEmployment, ScheduleStatus } from '../employment';
// import { TerminationSchema } from '../termination';

// const EmploymentSchema = new Schema({
//     _id: {type: Types.ObjectId, ref: 'Staff'},
//     departmentId: { type: Types.ObjectId, ref: 'Department' },
//     supervisor: { type: Types.ObjectId, ref: 'Staff' },
//     name: { type: String },
//     schedule: { type: Number, enum: ScheduleStatus },
//     termination: TerminationSchema,
//     date: { type: Date, default: Date.now },
// });

// export const EmploymentModel = model<IEmployment>('Employment', EmploymentSchema);
