import { Router, Request, Response } from "express";
import { Db } from "mongodb";
import { connectDB } from "../database";
import fetch from "node-fetch";

const router = Router();

//  Load users with posts and comments into the database
router.get("/load", async (req: Request, res: Response): Promise<void> => {
    try {
        const db = await connectDB();

        const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await usersResponse.json();

        const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await postsResponse.json();

        const commentsResponse = await fetch("https://jsonplaceholder.typicode.com/comments");
        const comments = await commentsResponse.json();

        if (Array.isArray(users) && Array.isArray(posts) && Array.isArray(comments)) {
            const validUsers = users.slice(0, 10).map(user => ({
                ...user,
                posts: posts
                    .filter(post => post.userId === user.id)
                    .map(post => ({
                        ...post,
                        comments: comments.filter(comment => comment.postId === post.id),
                    })),
            }));

            await db.collection("users").insertMany(validUsers);
            
            res.status(200).send(); 
            return;
        } 

        console.error("Invalid API response format:", { users, posts, comments });
        res.status(500).json({ error: "Invalid API response format" });

    } catch (error) {
        console.error("Error loading users:", error);
        res.status(500).json({ error: "Failed to load data" });
    }
});



// Delete all users
router.delete("/users", async (req: Request, res: Response) => {
    try {
        const db: Db = await connectDB();
        await db.collection("users").deleteMany({});
        res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete users" });
    }
});

// Delete a specific user by userId
router.delete("/users/:userId", async (req: Request, res: Response) => {
    try {
        const db: Db = await connectDB();
        const userId = parseInt(req.params.userId);

        if (isNaN(userId)) {
            res.status(400).json({ error: "Invalid userId" });
            return;
        }

        const result = await db.collection("users").deleteOne({ id: userId });

        if (result.deletedCount === 0) {
            res.status(404).json({ error: "User not found" });
        } else {
            res.status(200).json({ message: "User deleted successfully" });
        }

    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

// Get a specific user by userId
router.get("/users/:userId", async (req: Request, res: Response) => {
    try {
        const db: Db = await connectDB();
        const userId = parseInt(req.params.userId);

        if (isNaN(userId)) {
            res.status(400).json({ error: "Invalid userId" });
            return;
        }

        const user = await db.collection("users").findOne({ id: userId });

        if (!user) {
            res.status(404).json({ error: "User not found" });
        } else {
            res.status(200).json(user);
        }

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

// Create a new user
router.put("/users", async (req: Request, res: Response): Promise<void> => {
    try {
        const db: Db = await connectDB();
        const { id, name, username, email, address, phone, website, company, posts } = req.body;

        if (!id || !username || !email || !name) {
            res.status(400).json({ error: "ID, username, email, and name are required" });
            return;
        }

        const existingUser = await db.collection("users").findOne({
            $or: [{ id }, { username }, { email }]
        });

        if (existingUser) {
            res.status(409).json({ error: "User with this ID, username, or email already exists" }); 
            return;
        }

        const newUser = { id, name, username, email, address, phone, website, company, posts };
        await db.collection("users").insertOne(newUser);

        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
