import database from "../database/dbConnection.js"
import { capsuleCreated, capsuleCreatedError, capsuleeditError, capsulenameUpdated, internalserverError, resourceUpdated, capsulelimitAlert, resourceCreated, limitreached, successful } from "../utils/constant.js"
import { AppError } from "../utils/error.js"
import { getuserSubcriptionDetail, insertCapsule, editCapsule } from "../database/dbquery.js";

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
        if (capsule_count_used > capsule_count) return { status: limitreached, message: capsulelimitAlert }
        await client.query(insertCapsule, [userid, username])
        return { status: resourceCreated, message: capsuleCreated }

    } catch (error) {
        throw new AppError({ status: internalserverError.status, message: capsuleCreatedError })
    }
}

export default newcapsuleModal