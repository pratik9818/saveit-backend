import pool from "../database/dbConnection.js"
import { feedbackquery } from "../database/dbquery.js";
import { feedbackError, feedbackMessage, internalserverError, resourceCreated } from "../utils/constant.js";
import { AppError } from "../utils/error.js";

export const feedbackMode = async (userid,bugs,features,improvements,suggestions,forwhat) => {
    const client = await pool.connect()
    try {
         await client.query(feedbackquery , [bugs,features,improvements,suggestions,forwhat,userid])
        // console.log(res);
        return { status: resourceCreated, message: feedbackMessage};
    } catch (error) {
        throw new AppError({ status: internalserverError, message: feedbackError })
    }
    finally{
        client.release();
    }
}