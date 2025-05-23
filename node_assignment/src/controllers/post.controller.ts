import { Request, Response } from 'express';
import { Post } from '../models/post.model';

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};