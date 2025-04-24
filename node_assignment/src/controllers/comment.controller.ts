import { Request, Response } from 'express';
import { Comment } from '../models/comment.model';

export const getComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find(); 
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
