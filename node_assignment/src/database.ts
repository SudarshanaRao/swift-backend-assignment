import { MongoClient, Db } from "mongodb";

const MONGO_URI = "mongodb://localhost:27017"; 
const DB_NAME = "users-data";

export async function connectDB(): Promise<Db> {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB successfully!");
    return client.db(DB_NAME);
}
