import { model, Schema, Types } from 'mongoose';
import { IComment } from './interface';

export const commentSchema = new Schema({
  subject: { type: String },
  text: { type: String },
  resource: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel',
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Staff', 'Client', 'Funder'],
  },
  user: { type: Types.ObjectId, ref: 'Staff' },
  created: { type: Date, default: Date.now },
});

export const CommentModel = model<IComment>('comment', commentSchema);
