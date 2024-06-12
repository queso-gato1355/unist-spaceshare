import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

if (!MONGODB_DB) {
    throw new Error(
        "Please define the MONGODB_DB environment variable inside .env.local"
    );
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = await MongoClient.connect(MONGODB_URI);

    const db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

// close the connection
export async function closeConnection() {
    if (cachedClient) {
        try {
            await cachedClient.close();
            cachedClient = null;
            cachedDb = null;
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
        }
    }
}