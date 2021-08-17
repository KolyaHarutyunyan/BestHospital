import { model, Schema, Types } from 'mongoose';
import { ClientStatus } from './client.constants';
import { IClient } from './interface';
import { ClientContactModel } from './contact/contact.model';
import { ClientAuthorizationModel } from './authorization/authorization.model';
import { ClientAuthorizationServiceModel } from './authorizationservice/authorizationService.model';
import { ClientEnrollmentModel } from './enrollment/enrollment.model';

const ClientSchema = new Schema({
    firstName: { type: String },
    middleName: { type: String, default: null },
    lastName: { type: String },
    code: { type: String },
    ethnicity: { type: String },
    language: { type: String },
    familyLanguage: { type: String },
    gender: { type: String },
    age: { type: Number },
    birthday: { type: Date },
    status: { type: Number, enum: ClientStatus },
    enrollment: { type: Types.ObjectId, ref: 'Funder' },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null }
    // address: addressSchema,
});

ClientSchema.pre('remove', async function (next) {
    const clientAuthor = await ClientAuthorizationModel.find({ clientId: this._id });
    for (const authorization of clientAuthor) {
        await ClientAuthorizationServiceModel.deleteMany({ authorizationId: authorization._id });
    }
    await Promise.all([
        ClientContactModel.deleteMany({ clientId: this._id }),
        ClientEnrollmentModel.deleteMany({ clientId: this._id }),
        ClientAuthorizationModel.deleteMany({ clientId: this._id })
    ])
    next();
});
export const ClientModel = model<IClient>('Client', ClientSchema);
