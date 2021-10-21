import { Schema, Types, model } from 'mongoose';
import { IFile } from './interface';
import { FileStatus, FileType } from './constants';

const fileSchema = new Schema({
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
        enum: ['customer', 'agent', "carrier", "office", 'branch', 'load']
    },
    //type constants
    type: { type: String, enum: [FileType] },
    url: { type: String }
});

export const FileModel = model<IFile>('file', fileSchema);
