import database from "../database/dbConnection.js";
import { getuserSubcriptionDetail } from "../database/dbquery.js";
import { limitReached, storagelimitAlert, success, uploadpresignedurlError } from "../utils/constant.js";
import { AppError } from "../utils/error.js";
import AWS from 'aws-sdk'
export const uploadpresignedurlModal = async (userid) => {
    // 1. check for sub-details like storage size
    // 2. generate presign upload url
    // 3. res bak to client
    const client = await database()
    try {
        const { rows: [{ storage_limit, storage_used }] } = await client.query(getuserSubcriptionDetail, [userid])
        console.log(storage_limit, storage_used);
        if (storage_used >= storage_limit) return { status: limitReached, message: storagelimitAlert,data:null }


        const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');  // Wasabi's S3-compatible endpoint

        const s3 = new AWS.S3({
            endpoint: wasabiEndpoint,
            accessKeyId: '',  // Your Wasabi Access Key
            secretAccessKey: '',  // Your Wasabi Secret Key
            region: 'us-east-1',  // Choose the appropriate region (Wasabi uses 'us-east-1' generally)
        });


        const generatePresignedUrl = async (bucketName, objectKey) => {
            const params = {
              Bucket: bucketName,
              Key: objectKey,  // The path where the file will be stored (e.g., 'user-files/file.jpg')
              Expires: 60 * 5,  // URL expiration time in seconds (5 minutes in this case)
              ContentType: 'image/jpeg'  // You can specify the file's content type
            };
          
            try {
              const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
              console.log(uploadUrl);
              return { status: success, message: 'created',data:uploadUrl }
            } catch (error) {
              console.error('Error generating presigned URL:', error);
            //   throw error;
            }
          };
        generatePresignedUrl('testbucket-qwer-saveit','user')


    } catch (error) {
        throw new AppError({ status: internalserverError, message: uploadpresignedurlError })
    }

}

