import pool from "../database/dbConnection.js";
import { bucketName, datanotFound, downloadfileError, downloadlimitExceed, fragmentCreated, fragmentdeleteError, fragmentfilecreatedError, fragmentsdocsfilterError, fragmentsfilterError, fragmentssearchError, fragmenttagcreatedError, fragmenttextcreatedError, getfragmentsError, internalserverError, limitReached, notFound, resourceCreated, s3Url, success, successful, textupdatedError } from "../utils/constant.js";
import { AppError } from "../utils/error.js";
import convertbytestoMb from '../utils/bytestoMb.js'
import { insertfragmentfile, incrementstorageUsed, updatecapsule, insertfragmenttext, getallFragments, updateTag, updateText, deleteFragments, incrementdownloadCount, searchfragments, filterfragments, filterdocsfragments, capsuleUpdatetime, updatecapsuleSize, decrementstorageUsed } from '../database/dbquery.js'
export const filefragmentModal = async (capsuleid, size, tag, userid,filetype,filename) => {

    const client = await pool.connect();
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
            
            return { status: resourceCreated, message: fragmentCreated , data:res.rows[0] };
        }
    } catch (error) {
        await client.query('rollback')
        throw new AppError({ status: internalserverError, message: fragmentfilecreatedError })
    }
    finally{
        client.release();
    }
}
export const textfragmentModal = async (capsuleid, size, tag, textcontent,userid) => {

    const client = await pool.connect()
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
            
            return { status: resourceCreated, message: fragmentCreated, data:res.rows[0] };
        }
    } catch (error) {
        console.log(error);
        
        await client.query('rollback')
        throw new AppError({ status: internalserverError, message: fragmenttextcreatedError })
    }
    finally{
        client.release();
    }
}
export const getfragmentModal = async (createdat, userid ,capsuleid) => {

    // const client = await database()
    try {
        const res = await pool.query(getallFragments, [capsuleid,createdat])
        if(!res.rows.length)return { status: notFound, message: success,data:null };
        return { status: successful, message: success,data:res.rows };
    } catch (error) {
        throw new AppError({ status: internalserverError, message: getfragmentsError })
    }
}
export const fragmenttagModal = async (tag,fragmentid) => {

    const client = await pool.connect()
    try {
        const updated_at = new Date()
         await client.query(updateTag, [tag,updated_at,fragmentid])
         await client.query(capsuleUpdatetime, [updated_at,capsuleid])
        return { status: successful, message: success};
    } catch (error) {
        throw new AppError({ status: internalserverError, message: fragmenttagcreatedError })
    }
    finally{
        client.release();
    }
}
export const fragmenttextcontentModal = async (textcontent,fragmentid) => {

    const client = await pool.connect()
    try {
        const updated_at = new Date()
         await client.query(updateText, [textcontent,updated_at,fragmentid])
         await client.query(capsuleUpdatetime, [updated_at,capsuleid])
        return { status: successful, message: success};
    } catch (error) {
        throw new AppError({ status: internalserverError, message: textupdatedError })
    }
    finally{
        client.release();
    }
}
export const deletebatchfragmentModal = async(fragmentids,userid,capsuleid) =>{
    const client = await pool.connect()
    try {
        const updated_at = new Date()
        await client.query('begin')
            const {rows} = await client.query(deleteFragments,[fragmentids]);
            let capsuleSize = 0
            for (let index = 0; index < rows.length; index++) {
                capsuleSize = capsuleSize + rows[index].size
            }
             await client.query(updatecapsuleSize,[capsuleSize,updated_at,userid,capsuleid])

             await client.query(decrementstorageUsed,[capsuleSize,userid])
             await client.query('commit')
            return { status: successful, message: success,rowdelete:rows.length}
    } catch (error) {
        await client.query('rollback')
        throw new AppError({ status: internalserverError, message: fragmentdeleteError })
    }
    finally{
        client.release();
    }
}
export const downloadfilefragmentModal = async(fragmentid) =>{
    // const client = await database();
    try {
        
            const res = await pool.query(incrementdownloadCount,[fragmentid]);
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

export const getfragmentssearchModal = async(searchvalue,capsuleid) =>{
    // const client = await database();
    try {
            const searchTerm = `%${searchvalue}%`;
            const res = await pool.query(searchfragments,[capsuleid,searchTerm]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
    } catch (error) {
        throw new AppError({ status: internalserverError, message: fragmentssearchError })
    }
}
export const fragmentsfilterModal = async(fragmenttype,capsuleid,createdat) =>{
    // const client = await database();
    try {
            const res = await pool.query(filterfragments,[capsuleid,fragmenttype ,createdat]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
    } catch (error) {
        throw new AppError({ status: internalserverError, message: fragmentsfilterError })
    }
}
export const fragmentsdocsfilterModal = async(capsuleid,createdat) =>{
    // const client = await database();
    try {
       
            const res = await pool.query(filterdocsfragments,[capsuleid,createdat,'text','video','image']);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
    } catch (error) {
        throw new AppError({ status: internalserverError, message: fragmentsdocsfilterError })
    }
}