import AWS from 'aws-sdk'
import { internalserverError, presignedurlExpire, success, successful, uploadpresignedurlError } from './constant.js';
import { AppError } from './error.js';
const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');  // Wasabi's S3-compatible endpoint
import dotenv from 'dotenv'
dotenv.config()
const s3keyId = process.env.S3_KEY
const s3Secret = process.env.S3_SECRET
export const s3 = new AWS.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: s3keyId,  // Your Wasabi Access Key
    secretAccessKey: s3Secret,  // Your Wasabi Secret Key
    region: 'us-east-1',  // Choose the appropriate region (Wasabi uses 'us-east-1' generally)
});

export const generateuploadpresignedUrl = async (bucketname, filenames, userid) => {
    try {
        const uploadUrls = await Promise.all(filenames.map(async (filename) => {
            const params = {
                Bucket: bucketname,
                Key: `${userid}/${filename}`,
                Expires: presignedurlExpire,
                ContentType: 'application/octet-stream'
            };

            const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
            const cleanUrl = uploadUrl.replace('https://s3.wasabisys.com/', 'https://');
            return cleanUrl;
        }));
        return {
            status: successful,
            message: success,
            urls: uploadUrls
        };
    } catch (error) {
        throw new AppError(internalserverError, uploadpresignedurlError);
    }
};

