import database from "../database/dbConnection.js";
import { bucketName, downloadfileError, downloadlimitExceed, fragmentCreated, fragmentdeleteError, fragmentfilecreatedError, fragmenttagcreatedError, fragmenttextcreatedError, getfragmentsError, internalserverError, limitReached, resourceCreated, s3Url, success, successful, textupdatedError } from "../utils/constant.js";
import { AppError } from "../utils/error.js";
import convertbytestoMb from '../utils/bytestoMb.js'
import { insertfragmentfile, incrementstorageUsed, updatecapsule, insertfragmenttext, getallFragments, updateTag, updateText, deleteFragments, incrementdownloadCount } from '../database/dbquery.js'
export const filefragmentModal = async (capsuleid, size, tag, userid,filetype,filename) => {

    const client = await database()
    try {
        const sizeinMb = convertbytestoMb(size)
        const url = `${s3Url}/${bucketName}/${userid}/${filename}`
        const values = [capsuleid, sizeinMb, tag, url,filetype,filename]
        await client.query('begin')
        const res = await client.query(insertfragmentfile, values)
        if (res) {
            const updated_at = new Date()
            
            const res2 = await client.query(incrementstorageUsed, [sizeinMb, userid])
            const res3 = await client.query(updatecapsule, [sizeinMb,updated_at, userid,capsuleid])
            await Promise.all([res2, res3])
            await client.query('commit')
            
            return { status: resourceCreated, message: fragmentCreated };
        }
    } catch (error) {
        console.log(error);
        
        await client.query('rollback')
        throw new AppError({ status: internalserverError, message: fragmentfilecreatedError })
    }
}
export const textfragmentModal = async (capsuleid, size, tag, textcontent,userid) => {

    const client = await database()
    try {
        const sizeinMb = convertbytestoMb(size)
        
        const fragment_type = 'text'
        const values = [capsuleid, sizeinMb, tag,fragment_type,textcontent]
        await client.query('begin')
        const res = await client.query(insertfragmenttext, values)
        if (res) {
            const updated_at = new Date()
            
            const res2 = await client.query(incrementstorageUsed, [sizeinMb, userid])
            const res3 = await client.query(updatecapsule, [sizeinMb,updated_at, userid,capsuleid])
            await Promise.all([res2, res3])
            await client.query('commit')
            
            return { status: resourceCreated, message: fragmentCreated };
        }
    } catch (error) {
        console.log(error);
        
        await client.query('rollback')
        throw new AppError({ status: internalserverError, message: fragmenttextcreatedError })
    }
}
export const getfragmentModal = async (createdat, userid ,capsuleid) => {

    const client = await database()
    try {
        const res = await client.query(getallFragments, [capsuleid,createdat])
        if(!res.rows.length)return { status: successful, message: success,data:null };
        return { status: successful, message: success,data:res.rows };
    } catch (error) {
        throw new AppError({ status: internalserverError, message: getfragmentsError })
    }
}
export const fragmenttagModal = async (tag,fragmentid) => {

    const client = await database()
    try {
         await client.query(updateTag, [tag,fragmentid])
        return { status: successful, message: success};
    } catch (error) {
        throw new AppError({ status: internalserverError, message: fragmenttagcreatedError })
    }
}
export const fragmenttextcontentModal = async (textcontent,fragmentid) => {

    const client = await database()
    try {
         await client.query(updateText, [textcontent,fragmentid])
        return { status: successful, message: success};
    } catch (error) {
        throw new AppError({ status: internalserverError, message: textupdatedError })
    }
}
export const deletebatchfragmentModal = async(fragmentids) =>{
    const client = await database();
    try {
            const res = await client.query(deleteFragments,[fragmentids]);
            return { status: successful, message: success,rowdelete:res.rowCount}
    } catch (error) {
        throw new AppError({ status: internalserverError, message: fragmentdeleteError })
    }
}
export const downloadfilefragmentModal = async(fragmentid) =>{
    const client = await database();
    try {
        
            const res = await client.query(incrementdownloadCount,[fragmentid]);
            const {download_count} = res.rows[0];
            const freememberDownloadcount = 10
            if(download_count < freememberDownloadcount+1){
                return { status: limitReached, message: downloadlimitExceed,downloadcount:download_count}
            }
            return { status: successful, message: success,downloadcount:download_count}
    } catch (error) {
        throw new AppError({ status: internalserverError, message: downloadfileError })
    }
}