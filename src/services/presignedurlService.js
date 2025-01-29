import { uploadpresignedurlModal } from "../models/presignedurlModal.js"
import { useridAbsent } from "../utils/constant.js";
import { AppError } from "../utils/error.js";

export const uploadPresignedurlService = async (userid,filenames)=>{
    if(!userid) return {status:badRequest,message:useridAbsent,data:''}
    try {
        return await uploadpresignedurlModal(userid,filenames)
    } catch (error) {
        throw new AppError({ status: error.status, message: error.message })
    }
}