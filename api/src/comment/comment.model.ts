import { model, Schema, Types } from 'mongoose';
import { IComment } from './interface';

export const commentSchema = new Schema({
    text: { type: String },
    created: { type: Date, default: Date.now },
    funder: {type: Types.ObjectId, ref: 'Funder'},
    user: { type: Types.ObjectId, ref: 'Admin' }
});

export const CommentModel = model<IComment>('comment', commentSchema);