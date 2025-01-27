import { logout } from "../database/dbquery.js"
import { internalserverError, logoutError, logoutSucessfully, successful } from "../utils/constant.js"
import pool from "../database/dbConnection.js";
const logoutModal = async(userid)=>{
    const client = await pool.connect()
    try {
        const res = await client.query(logout,[false,userid])
        
        return { status: successful, message: logoutSucessfully,login:false};
    } catch (error) {
        throw new AppError({ status: internalserverError, message: logoutError})
    }
    finally{
        client.release()
    }
}
export default logoutModal