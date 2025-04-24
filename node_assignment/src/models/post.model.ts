import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    userId: number;
    title: string;
    body: string;
}

const PostSchema: Schema = new Schema({
    userId: { type: Number, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true }
});

export const Post = mongoose.model<IPost>('Post', PostSchema);
