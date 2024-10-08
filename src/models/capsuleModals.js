import database from "../database/dbConnection.js"
import { capsuleCreated, capsuleCreatedError, capsuleeditError, capsulenameUpdated, internalserverError, resourceUpdated, capsulelimitAlert, resourceCreated, successful, success, datanotFound, notFound, limitReached, capsulesdataError, capsuledatemodifiedError, capsulesortbydatecreatedError, capsulesortbysizeError, capsulesearchError, capsuledeleteError } from "../utils/constant.js"
import { AppError } from "../utils/error.js"
import { getuserSubcriptionDetail, insertCapsule,getcaplsulesbyDatemodified, editCapsule, getCapsulesInDescOrder, getCapsulesInAscOrder, getCapsulessortbySizeInAsc, getCapsulessortbySizeInDesc, searchcapsulesbyName, incrementcapsuleCount, deleteCapsules } from "../database/dbquery.js";

export const editcapsuleModal = async (capsulename, capsuleid,userid) => {
    const client = await database()
    try {
        const values = [capsulename, userid,capsuleid]
        await client.query(editCapsule, values)
        return { status: successful, message: capsulenameUpdated }

    } catch (error) {
        throw new AppError({ status: internalserverError, message: capsuleeditError })
    }
}

export const newcapsuleModal = async (capsulename, userid) => {
    const client = await database()
    try {
        await client.query('begin')
        const { rows: [{ capsule_count, capsule_count_used }] } = await client.query(getuserSubcriptionDetail, [userid])
        
        if (capsule_count_used > capsule_count) {
            await client.query('rollback')
            return { status: limitReached, message: capsulelimitAlert }
        }
        await client.query(insertCapsule, [userid, capsulename])
        let count = capsule_count_used + 1
        await client.query(incrementcapsuleCount, [count,userid])
        await client.query('commit')
        return { status: resourceCreated, message: capsuleCreated }

    } catch (error) {
        await client.query('rollback')
        throw new AppError({ status: internalserverError.status, message: capsuleCreatedError })
    }
}


export const getcapsulesbyDatemodifiedModal = async(datemodified,userid) =>{
    const client = await database();
    try {
            const res = await client.query(getcaplsulesbyDatemodified,[userid,datemodified]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
    } catch (error) {
        throw new AppError({ status: internalserverError.status, message: capsuledatemodifiedError })
    }
}
export const getcapsulesortbyDatecreatedModal = async(order,date,userid) =>{
    const client = await database();
    try {
        if(order === 'asc'){
            const res = await client.query(getCapsulesInAscOrder,[userid,date]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
        }else if(order === 'desc'){
            const res = await client.query(getCapsulesInDescOrder,[userid,date]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
        }
    } catch (error) {
        throw new AppError({ status: internalserverError.status, message: capsulesortbydatecreatedError })
    }
}

export const getcapsulesortbysizeModal = async(order,size,userid) =>{
    const client = await database();
    try {
        if(order === 'asc'){
            const res = await client.query(getCapsulessortbySizeInAsc,[userid,size]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
        }else if(order === 'desc'){
            const res = await client.query(getCapsulessortbySizeInDesc,[userid,size]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
        }
    } catch (error) {
        throw new AppError({ status: internalserverError.status, message: capsulesortbysizeError })
    }
}
export const getcapsulesearchModal = async(searchvalue,userid) =>{
    const client = await database();
    try {
            const searchTerm = `%${searchvalue}%`;
            const res = await client.query(searchcapsulesbyName,[userid,searchTerm]);
            if(!res.rows.length) return { status:notFound, message: datanotFound }
            return { status: successful, message: success , data:res.rows}
    } catch (error) {
        throw new AppError({ status: internalserverError.status, message: capsulesearchError })
    }
}
export const deletebatchcapsulesModal = async(capsuleIds,userid) =>{
    const client = await database();
    try {
            const res = await client.query(deleteCapsules,[userid,capsuleIds]);
            return { status: successful, message: success,rowdelete:res.rowCount}
    } catch (error) {
        throw new AppError({ status: internalserverError.status, message: capsuledeleteError })
    }
}