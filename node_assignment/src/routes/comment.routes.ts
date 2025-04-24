import express from 'express';
import { Comment } from '../models/comment.model';

const router = express.Router();

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;