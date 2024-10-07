import database from "../database/dbConnection.js"
import { capsuleCreated, capsuleCreatedError, capsuleeditError, capsulenameUpdated, internalserverError, resourceUpdated, capsulelimitAlert, resourceCreated, successful, success, datanotFound, notFound, limitReached, capsulesdataError } from "../utils/constant.js"
import { AppError } from "../utils/error.js"
import { getuserSubcriptionDetail, insertCapsule, editCapsule, getCapsules } from "../database/dbquery.js";

export const editcapsuleModal = async (capsulename, capsuleid) => {
    const client = await database()
    try {
        const values = [capsulename, capsuleid]
        await client.query(editCapsule, values)
        return { status: successful, message: capsulenameUpdated }

    } catch (error) {
        throw new AppError({ status: internalserverError, message: capsuleeditError })
    }
}

const newcapsuleModal = async (username, userid) => {
    const client = await database()
    try {
        const { rows: [{ capsule_count, capsule_count_used }] } = await client.query(getuserSubcriptionDetail, [userid])
        if (capsule_count_used > capsule_count) return { status: limitReached, message: capsulelimitAlert }
        await client.query(insertCapsule, [userid, username])
        return { status: resourceCreated, message: capsuleCreated }

    } catch (error) {
        throw new AppError({ status: internalserverError.status, message: capsuleCreatedError })
    }
}

export default newcapsuleModal

export const getallcapsuleModal = async(userid) =>{
    const client = await database();
    try {
        const res = await client.query(getCapsules,[userid]);
        console.log(res.rows[0]);
        if(!res.rows.length) return { status:notFound, message: datanotFound }

        return { status: successful, message: success , data:res.rows[0]}
    } catch (error) {
        throw new AppError({ status: internalserverError.status, message: capsulesdataError })
    }
}