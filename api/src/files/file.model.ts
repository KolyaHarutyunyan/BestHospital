import { Schema, Types, model } from 'mongoose';
import { IFile } from './interface';

const fileSchema = new Schema({
  uploader: { type: Types.ObjectId, ref: 'staff' },
  url: { type: String, required: true },
  thumbUrl: { type: String },
  name: { type: String },
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
