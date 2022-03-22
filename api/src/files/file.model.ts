import { Schema, Types, model } from 'mongoose';
import { IFile } from './interface';

const fileSchema = new Schema({
  resource: { type: Types.ObjectId },
  type: { type: String },
  mimetype: { type: String },
  name: { type: String },
  size: { type: Number },
  url: { type: String },
});

export const FileModel = model<IFile>('file', fileSchema);
export const FileSchema = new Schema(
  {
    url: { type: String },
    thumbUrl: { type: String },
    id: { type: String },
    name: { type: String },
  },
  { _id: false },
);
