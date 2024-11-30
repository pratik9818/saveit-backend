import pool from '../database/dbConnection.js'
import { bucketName } from '../utils/constant.js';
import { s3 } from '../utils/s3.js';

const getdeletedCapsules = async () => {
    let storecapsuleid = []
    const { rows } = await pool.query(`select capsule_id from capsules where is_deleted = true`)
    console.log('total capsules need to delete', rows);

    for (let index = 0; index < rows.length; index++) {
        storecapsuleid.push(rows[index].capsule_id)
    }
    return storecapsuleid
}
const getFragments = async (capsuleidStore) => {
    const { rows } = await pool.query('select url from fragments where capsule_id = any($1) and url is not null', [capsuleidStore])
    console.log('all fragments url', rows);
    return rows;
}
const deleteCapsules = async () => {
    const res = pool.query('delete from capsules where is_deleted= true')
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
        const capsuleidstore = await getdeletedCapsules();
        if (capsuleidstore.length) urls = await getFragments(capsuleidstore);
        else return console.log('nothing to delete');
    } catch (error) {
        console.log('error while getting deleted capsule and url from fragment');
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
    console.info('delete paths', deletepath);
    try {
        const res = await deleteCapsules();
        console.log(res);
        console.info('capsules deleted');

    } catch (error) {
        console.log('error while deleteing capsules');
        console.error(error)
        return;
    }

    // delete the obj
    try {
        for (let index = 0; index < deletepath.length; index++) {
            console.info('deleted file path', deletepath[index]);
            deleteObjectFromS3(deletepath[index])
        }
        console.info('--- DELETE PROCESS DONE SUCESSFULLY ----');

    } catch (error) {
        console.log('error in deleting obj in s3');
        console.error(error);
    }
}

execute()