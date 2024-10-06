import pkg from 'pg';  // Import the whole package as `pkg`
import dotenv from 'dotenv'
dotenv.config()
const dburl = process.env.DATABASE_URL;
import { dberror, internalserverError, serverError } from '../utils/constant.js';
import { AppError } from '../utils/error.js';
const { Client } = pkg;  // Destructure to get the Client class

const database = async function getClient() {
    try {
        const client = new Client({
            connectionString:dburl
        });
        await client.connect();
        return client;
    } catch (error) {
       throw new AppError(internalserverError,dberror)
    }
}

export default database