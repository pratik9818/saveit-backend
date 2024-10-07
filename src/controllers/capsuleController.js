import { editcapsuleName, getallCaplsules, newCapsule } from "../services/capsuleServices.js";

export const createCapsule = async (req, res, next) => {
    const capsuleName = req.body.capsuleName;
    const userId = req.user_id;

    try {
        const {status,message} = await newCapsule(capsuleName, userId)
        res.status(status).json({
            message: message,
        })
    } catch (error) {
        console.log(error);

        next({ status: error.status, message: error.message })
    }
}

export const editCapsule = async(req,res,next)=>{
    const capsuleId = req.params.capsuleid;
    const updatedcapsuleName = req.body.capsuleName;

    try {
        const {status,message} = await editcapsuleName(updatedcapsuleName,capsuleId)
        res.status(status).json({
            message: message,
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}

export const getCaplsules = async(req,res,next)=>{
    const userId = req.user_id
    try {
        const {status,message,data} = await getallCaplsules(userId)
        res.status(status).json({
            message: message,
            data:data
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}