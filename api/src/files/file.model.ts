import { Schema, Types, model } from 'mongoose';
import { IFile } from './interface';

const fileSchema = new Schema({
    resource: { type: Types.ObjectId },
    type: { type: String },
    mimetype: { type: String },
    url: { type: String }
});

export const FileModel = model<IFile>('file', fileSchema);
