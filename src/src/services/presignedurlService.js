import { uploadpresignedurlModal } from "../models/presignedurlModal.js"
import { useridAbsent } from "../utils/constant.js";

export const uploadPresignedurlService = async (userid,filename)=>{
    if(!userid) return {status:badRequest,message:useridAbsent,data:''}
    try {
        return await uploadpresignedurlModal(userid,filename,userid)
    } catch (error) {
        throw new AppError({ status: error.status, message: error.message })
    }
}