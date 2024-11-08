import pool from "../database/dbConnection.js"
import { capsuleCreated, capsuleCreatedError, capsuleeditError, capsulenameUpdated, internalserverError, resourceUpdated, capsulelimitAlert, resourceCreated, successful, success, datanotFound, notFound, limitReached, capsulesdataError, capsuledatemodifiedError, capsulesortbydatecreatedError, capsulesortbysizeError, capsulesearchError, capsuledeleteError } from "../utils/constant.js"
import { AppError } from "../utils/error.js"
import { getuserSubcriptionDetail, insertCapsule,getcaplsulesbyDatemodified, editCapsule, getCapsulesInDescOrder, getCapsulesInAscOrder, getCapsulessortbySizeInAsc, getCapsulessortbySizeInDesc, searchcapsulesbyName, incrementcapsuleCount, deleteCapsules, updatesubDetailOnDeleteCapsule } from "../database/dbquery.js";

export const editcapsuleModal = async (capsulename, capsuleid,userid) => {
    // const client = await database()
    try {
        const values = [capsulename, userid,capsuleid]
        await pool.query(editCapsule, values)
        return { status: successful, message: capsulenameUpdated }

    } catch (error) {
        throw new AppError({ status: internalserverError, message: capsuleeditError })
    }
}

export const newcapsuleModal = async (capsulename, userid) => {
    const client = await pool.connect()
    try {
        await client.query('begin')
        const { rows: [{ capsule_count, capsule_count_used }] } = await client.query(getuserSubcriptionDetail, [userid])
        
        if (capsule_count_used > capsule_count) {
            await client.query('rollback')
            return { status: limitReached, message: capsulelimitAlert ,capsuleId:null }
        }
        const date = new Date().toUTCString()
       const res =  await client.query(insertCapsule, [userid, capsulename,date])
       
       await client.query(incrementcapsuleCount, [1,userid])
       
        await client.query('commit')
        return { status: resourceCreated, message: capsuleCreated ,capsuleId:res.rows[0].capsule_id}

    } catch (error) {
        console.log(error);
        
        await client.query('rollback')
        throw new AppError({ status: internalserverError, message: capsuleCreatedError })
    }
    finally{
        client.release();
    }
}


export const getcapsulesbyDatemodifiedModal = async(datemodified,userid) =>{
    // const client = await database();
    try {
            const res = await pool.query(getcaplsulesbyDatemodified,[userid,datemodified]);
            
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
    } catch (error) {
        throw new AppError({ status: internalserverError, message: capsuledatemodifiedError })
    }
}
export const getcapsulesortbyDatecreatedModal = async(order,date,userid) =>{
    // const client = await database();
    try {
        if(order === 'asc'){
            const res = await pool.query(getCapsulesInAscOrder,[userid,date]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
        }else if(order === 'desc'){
            const res = await pool.query(getCapsulesInDescOrder,[userid,date]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
        }
    } catch (error) {
        throw new AppError({ status: internalserverError, message: capsulesortbydatecreatedError })
    }
}

export const getcapsulesortbysizeModal = async(order,size,userid) =>{
    // const client = await database();
    try {
        if(order === 'asc'){
            const res = await pool.query(getCapsulessortbySizeInAsc,[userid,size]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
        }else if(order === 'desc'){
            const res = await pool.query(getCapsulessortbySizeInDesc,[userid,size]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
        }
    } catch (error) {
        throw new AppError({ status: internalserverError, message: capsulesortbysizeError })
    }
}
export const getcapsulesearchModal = async(searchvalue,userid) =>{
    // const client = await database();
    try {
            const searchTerm = `%${searchvalue}%`;
            const res = await pool.query(searchcapsulesbyName,[userid,searchTerm]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
    } catch (error) {
        throw new AppError({ status: internalserverError, message: capsulesearchError })
    }
}
export const deletebatchcapsulesModal = async(capsuleIds,userid) =>{
    const client = await pool.connect();
    try {
            await client.query('begin')
            const {rows} = await client.query(deleteCapsules,[userid,capsuleIds]);
            
            const totalCapsule = rows.length
            let capsulesSize = 0
            for (let index = 0; index < totalCapsule; index++) {
                capsulesSize = capsulesSize + rows[index].capsule_size
            }

            await client.query(updatesubDetailOnDeleteCapsule,[capsulesSize,totalCapsule,userid])
            await client.query('commit')
            return { status: successful, message: success,rowdelete:totalCapsule}
    } catch (error) {
        await client.query('rollback')
        throw new AppError({ status: internalserverError, message: capsuledeleteError })
    }
    finally{
        client.release();
    }
}