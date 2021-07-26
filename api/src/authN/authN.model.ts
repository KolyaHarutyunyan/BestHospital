import { model, Schema, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IAuth } from './interface/';
import { RegistrationStatus } from './authN.constants';

const authnSchema = new Schema({
  _id: {type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String },
  roles: [{ type: Types.ObjectId, ref: 'Role' }],
  status: { type: Number, enum: RegistrationStatus, required: true },
  session: { type: String },
});

const SALT_ROUNDS = 8;
authnSchema.pre('save', hashPassword);

/** Private methods */
async function hashPassword(next) {
  //Check if the password is changed or is new
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
    return next();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

/** if the supplied password matches the user password, this function returns true and false otherwise */
authnSchema.methods.comparePassword = comparePassword;

async function comparePassword(password: string): Promise<boolean> {
  try {
    return bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
}

// export type AuthDocument = AuthEntity & Document;
export const AuthnModel = model<IAuth>('auth', authnSchema);
