import { editcapsuleName, getcaplsulesSortbyDatecreated,getcapsulesbyDatemodified, batchdeleteCapsules,getcaplsulesSortbySize, newCapsule,getsearchCapsules } from "../services/capsuleServices.js";

export const createCapsule = async (req, res, next) => {
    
    const capsuleName = req.body.capsuleName;
    const userId = req.user_id;

    try {
        const {status,message} = await newCapsule(capsuleName, userId)
        res.status(status).json({
            message: message,
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}

export const editCapsule = async(req,res,next)=>{
    const capsuleId = req.params.capsuleid;
    const updatedcapsuleName = req.body.capsuleName;
    const userId = req.user_id;
    try {
        const {status,message} = await editcapsuleName(updatedcapsuleName,capsuleId,userId)
        res.status(status).json({
            message: message,
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}

export const getcapsules = async(req,res,next)=>{
    const dateModified = req.query.dateModified
    const userId = req.user_id
    conole.log(dateModified)
    try {
        const {status,message,data} = await getcapsulesbyDatemodified(dateModified,userId)
        res.status(status).json({
            message: message,
            data:data
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}
export const sortcapsulesbyDatecreated = async(req,res,next)=>{
    const order = req.query.order;
    const date = req.query.date
    // const date = new Date()
    const userId = req.user_id;
    try {
        const {status,message,data} = await getcaplsulesSortbyDatecreated(order,date,userId)
        res.status(status).json({
            message: message,
            data:data
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}
export const sortcapsulesbySize = async(req,res,next)=>{
    const order = req.query.order;
    const size = req.query.size;
    const userId = req.user_id;
    try {
        const {status,message,data} = await getcaplsulesSortbySize(order,size,userId)
        res.status(status).json({
            message: message,
            data:data
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}
export const searchCapsules = async(req,res,next)=>{
    const searchValue = req.query.searchValue;
    const userId = req.user_id;
    try {
        const {status,message,data} = await getsearchCapsules(searchValue,userId)
        res.status(status).json({
            message: message,
            data:data
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}
export const deleteCapsules = async(req,res,next)=>{
    const {capsuleIds} = req.body;
    const userId = req.user_id;
    try {
        const {status,message,rowdelete} = await batchdeleteCapsules(capsuleIds,userId)
        res.status(status).json({
            message: message,
            rowdeleted:rowdelete
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}