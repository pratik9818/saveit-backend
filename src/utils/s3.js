import AWS from 'aws-sdk'
import { internalserverError, presignedurlExpire, success, successful, uploadpresignedurlError } from './constant.js';
import { AppError } from './error.js';
const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');  // Wasabi's S3-compatible endpoint

export const s3 = new AWS.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: 'OSL58976EMG1NF22MQFZ',  // Your Wasabi Access Key
    secretAccessKey: 'tSrgJms88OMqn8CM2M4SDGGSXmUDKO3h59lk5BAQ',  // Your Wasabi Secret Key
    region: 'us-east-1',  // Choose the appropriate region (Wasabi uses 'us-east-1' generally)
});
export const generateuploadpresignedUrl = async (bucketname, filename,userid) => {
    const params = {
      Bucket: bucketname,
      Key: `${userid}/${filename}`,  // The path where the file will be stored (e.g., 'user-files/file.jpg')
      Expires: presignedurlExpire,  // URL expiration time in seconds (5 minutes in this case)
      ContentType: 'application/json'  // You can specify the file's content type
    };
  
    try {
      const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
      return { status: successful, message: success,data:uploadUrl }
    } catch (error) {
        throw new AppError({ status: internalserverError, message: uploadpresignedurlError })
    }
  };