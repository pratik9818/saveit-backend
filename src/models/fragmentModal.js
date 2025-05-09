import pool from "../database/dbConnection.js";
import { allDataFetched, bucketName, datanotFound, deletedResource, downloadfileError, downloadlimitExceed, downloadSuccess, fragmentCreated, fragmentdeleteError, fragmentfilecreatedError, fragmentsdocsfilterError, fragmentsfilterError, fragmentssearchError, fragmenttagcreatedError, fragmenttextcreatedError, freememberDownloadcount, getfragmentsError, internalserverError, limitReached, notFound, resourceCreated, s3Url, success, successful, textupdatedError, updateMessage } from "../utils/constant.js";
import { AppError } from "../utils/error.js";
import convertbytestoMb from '../utils/bytestoMb.js'
import { insertfragmentfile, incrementstorageUsed, updatecapsule, insertfragmenttext, getallFragments, updateTag, updateText, deleteFragments, incrementdownloadCount, searchfragments, filterfragments, filterdocsfragments, capsuleUpdatetime, updatecapsuleSize, decrementstorageUsed } from '../database/dbquery.js'
export const filefragmentModal = async (fileObjectsArray,userid) => {

    const client = await pool.connect();
    try {
        let capsuleId = fileObjectsArray[0].capsuleId;
        
        await client.query('begin')
        const insertPromises = fileObjectsArray.map(({ capsuleId, size, tag, fileType, fileName }) => {
            const sizeInMb = convertbytestoMb(size);
            const url = `https://${bucketName}/${userid}/${fileName}`;
            
            // Use parameterized values instead of string concatenation
            return client.query(insertfragmentfile, [
                capsuleId, 
                sizeInMb, 
                tag, 
                url, 
                fileType, 
                fileName
            ]);
        });
        
        // Execute all inserts in parallel
        const fragmentResults = await Promise.all(insertPromises);
        const rows = fragmentResults.map(result => result.rows[0]);
                              
        if (fragmentResults) {
            const updated_at = new Date()
            const totalSize = fileObjectsArray.reduce((acc, { size }) => 
                acc + Number(convertbytestoMb(size)), 0
            )
            const res2 = await client.query(incrementstorageUsed, [totalSize, userid])
            const res3 = await client.query(updatecapsule, [totalSize,updated_at, userid,capsuleId])
            await Promise.all([res2, res3])
            await client.query('commit')
            
            return { status: resourceCreated, message: fragmentCreated , data:rows };
        }
    } catch (error) {
        console.log(error);
        
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
        if(!res.rows.length)return { status: successful, message: allDataFetched,data:null };
        return { status: successful, message: success,data:res.rows };
    } catch (error) {
        throw new AppError({ status: internalserverError, message: getfragmentsError })
    }
}
export const fragmenttagModal = async (tag,fragmentid,capsuleid) => {

    const client = await pool.connect()
    try {
        const updated_at = new Date()
       await client.query(updateTag, [tag,updated_at,fragmentid])
        await client.query(capsuleUpdatetime, [updated_at,capsuleid])
        
        return { status: successful, message: updateMessage};
    } catch (error) {
        throw new AppError({ status: internalserverError, message: fragmenttagcreatedError })
    }
    finally{
        client.release();
    }
}
export const fragmenttextcontentModal = async (textcontent,fragmentid,capsuleid,size,userid) => {

    const client = await pool.connect()
    try {
        const sizeinMb = convertbytestoMb(size)
        await client.query('begin')
        //ALERT -- WHEN I UPDATEING THE STORAGE SIZE, I DO NOT MINUS THE STORAGE SIZE FIRST OF OLD TEXT . I JUST ADD THE NEW SIZE OF UPDATE TEXT IN STORAGE COLUMN ALTHOUGH IT NOT EFFECT TOO MUCH IN SIZE OF STORAGE
        const updated_at = new Date()
         await client.query(updateText, [textcontent,updated_at,sizeinMb,fragmentid])
         await client.query(incrementstorageUsed, [sizeinMb, userid])
         await client.query(updatecapsule, [sizeinMb,updated_at, userid,capsuleid])
         await client.query('commit')
        return { status: successful, message: updateMessage};
    } catch (error) {
        await client.query('rollback')
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
            return { status: successful, message: deletedResource,rowdelete:rows.length}
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
            
            if(download_count == freememberDownloadcount){
                return { status: limitReached, message: downloadlimitExceed,downloadcount:download_count}
            }
            return { status: successful, message: downloadSuccess,downloadcount:download_count}
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