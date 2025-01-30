import pool from "../database/dbConnection.js";
import { getuserSubcriptionDetail } from "../database/dbquery.js";
import { bucketName, limitReached, storagelimitAlert, uploadpresignedurlError } from "../utils/constant.js";
import { AppError } from "../utils/error.js";
import { generateuploadpresignedUrl } from "../utils/s3.js";


export const uploadpresignedurlModal = async (userid,fileNames) => {
    // const client = await database()
    try {
        const { rows: [{ storage_limit, storage_used }] } = await pool.query(getuserSubcriptionDetail, [userid])
        if (storage_used >= storage_limit) return { status: limitReached, message: storagelimitAlert,data:'' }
        // ! IMP ! above can be bug for example user used storage 490 out 500 mb above condition will be false and user uploading 50 mb (which is max upload limit for now) then storage size will be 540 which is more than storage limit
       return await generateuploadpresignedUrl(bucketName,fileNames,userid)
      
    } catch (error) {
        throw new AppError({ status: internalserverError, message: uploadpresignedurlError })
    }

}

