import { model, Schema, Types } from 'mongoose';
import { ClientStatus } from './client.constants';
import { IClient } from './interface';
// adminId: { type: Types.ObjectId, ref: 'auth' },

const ClientSchema = new Schema({
    firstName: { type: String },
    middleName: { type: String, default: null },
    lastName: { type: String },
    code: { type: String },
    ethnicity: { type: String },
    language: { type: String },
    familyLanguage: { type: String },
    gender: { type: String },
    birthday: { type: String },
    status: { type: Number, enum: ClientStatus },
    enrollment: { type: String },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null }
    // address: addressSchema,
});
// ClientSchema.pre('deleteOne',  { query: true }, function (next) {
//     console.log('hi')
//     // Remove all the assignment docs that reference the removed person.
//     this.model('enrollments').deleteMany({});
// });
export const ClientModel = model<IClient>('Client', ClientSchema);
