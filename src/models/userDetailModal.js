import pool from "../database/dbConnection.js";
import { getUserName } from "../database/dbquery.js";
import { internalserverError, notFound, successful, UserNameError } from "../utils/constant.js";
import { AppError } from "../utils/error.js"
export async function userNameModal(userid){

try {
    const {rows:[{user_name}]} = await pool.query(getUserName, [userid]);
    if(!user_name){
        return({ status: notFound, message: 'User not found',username:null })
    }
    return { status:successful , username: user_name ,message: 'User found' }
    
} catch (error) {
    console.log(error);
            throw new AppError({ status: internalserverError, message: UserNameError })
}
}