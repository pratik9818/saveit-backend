import dotenv from 'dotenv'
import pkg from 'pg';  // Import the whole package as `pkg`
dotenv.config()
// import {Pool} from 'pg'

// const dburl = process.env.DATABASE_URL;
const user = process.env.DB_USER;
const database = process.env.DATABASE_NAME;
const host = process.env.DB_HOST;
const port = process.env.DATABASE_PORT;
const max = process.env.DATABASE_MAX_CONNECTION;
const password = process.env.DATABASE_PASSWORD;

import { dberror, internalserverError, serverError } from '../utils/constant.js';
import { AppError } from '../utils/error.js';
// const { Client } = pkg;  // Destructure to get the Client class
const { Pool } = pkg;  // Destructure to get the Client class
const pool = new Pool({
    user:user ,
    host:host ,
    database: database,
    password:password,
    port: port,  
    max: max,//for testing prupose
});
// const pool = function getClient() {
//     try {
//         // const client = await pool.connect()
//         // const client = new Client({
//         //     connectionString:dburl
//         // });
//         return createpool;

//     } catch (error) {
//        throw new AppError(internalserverError,dberror)
//     }
// }

export default pool