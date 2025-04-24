import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    postId: number;
    name: string;
    email: string;
    body: string;
}

const CommentSchema: Schema = new Schema({
    postId: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    body: { type: String, required: true },
});

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
