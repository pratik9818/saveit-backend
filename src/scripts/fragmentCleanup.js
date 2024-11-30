import pool from '../database/dbConnection.js'
import { bucketName } from '../utils/constant.js';
import { s3 } from '../utils/s3.js';

const getdeletedFragment = async () => {
    const { rows } = await pool.query(`select url from fragments where is_deleted = true and url is not null`)
    return rows
}
const deleteFragment = async () => {
    const res = pool.query('delete from fragments where is_deleted= true')
    return res
}
async function deleteObjectFromS3(objectKey) {
    const params = {
        Bucket: bucketName,
        Key: objectKey,
    };

    try {
        const data = await s3.deleteObject(params).promise();
        console.log(`Successfully deleted ${objectKey} from ${bucketName}`, data);
    } catch (error) {
        console.error(`Error deleting ${objectKey} from ${bucketName}:`, error);
    }
}

async function execute() {
    let urls;
    try {
        urls = await getdeletedFragment();
    } catch (error) {
        console.log('error while getting deleted rows');
        console.error(error)
        return;
    }
    let deletepath = []
    for (let index = 0; index < urls.length; index++) {
        let url = urls[index].url
        const name = url.split('/')[url.split('/').length - 1]
        const userid = url.split('/')[url.split('/').length - 2]
        const path = userid + '/' + name
        deletepath.push(path)
    }
    console.info('deleted paths',deletepath);
    try {
        const res = await deleteFragment();
        console.log(res);
        console.log('rows deleted');
        
    } catch (error) {
        console.log('error while deleteing rows');
        console.error(error)
        return;
    }

    // delete the obj
    try {
        for (let index = 0; index < deletepath.length; index++) {
            console.info('deleted file path',deletepath[index]);
            deleteObjectFromS3(deletepath[index])
        }
        console.info('--- DELETE PROCESS DONE SUCESSFULLY ----');
        
    } catch (error) {
        console.log('error in deleting obj in s3');
        console.error(error);
    }
}

execute()