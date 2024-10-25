import pool from "../database/dbConnection.js";
import { getuserSubcriptionDetail } from "../database/dbquery.js";
import { bucketName, limitReached, storagelimitAlert, uploadpresignedurlError } from "../utils/constant.js";
import { AppError } from "../utils/error.js";
import { generateuploadpresignedUrl } from "../utils/s3.js";


export const uploadpresignedurlModal = async (userid,fileName) => {
    // const client = await database()
    try {
        const { rows: [{ storage_limit, storage_used }] } = await pool.query(getuserSubcriptionDetail, [userid])
        if (storage_used >= storage_limit) return { status: limitReached, message: storagelimitAlert,data:'' }

       return await generateuploadpresignedUrl(bucketName,fileName,userid)
      
    } catch (error) {
        throw new AppError({ status: internalserverError, message: uploadpresignedurlError })
    }

}



  

// access-key= OSL58976EMG1NF22MQFZ
// secret-key= tSrgJms88OMqn8CM2M4SDGGSXmUDKO3h59lk5BAQ
//need to figure  our how user get access only its object
