import { model, Schema, Types } from 'mongoose';
import { IComment } from './interface';

export const commentSchema = new Schema({
    text: { type: String },
    created: { type: Date, default: Date.now },
    resource: {
        type: Schema.Types.ObjectId,
        required: true,
        // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
        // will look at the `onModel` property to find the right model.
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Staff', 'Client', "Funder"]
    },
    user: { type: Types.ObjectId, ref: 'Admin' }

});

export const CommentModel = model<IComment>('comment', commentSchema);