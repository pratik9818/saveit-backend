import { uploadpresignedurlModal } from "../models/presignedurlModal.js"
import { useridAbsent } from "../utils/constant.js";

export const uploadPresignedurlService = (userid)=>{
    if(!userid) return {status:badRequest,message:useridAbsent,data:null}
    try {
        return uploadpresignedurlModal(userid)
    } catch (error) {
        throw new AppError({ status: error.status, message: error.message })
    }
}