import { AppError } from "../utils/error.js"
import { badRequest, capsulenameerror,capsuleiderror, useridAbsent } from "../utils/constant.js"
import newcapsuleModal, { getallcapsuleModal, editcapsuleModal } from "../models/capsuleModals.js"
const mincharLimit = 2

export const newCapsule = async (capsulename, userid) => {
    if (!capsulename || capsulename.length < mincharLimit) return {status:badRequest,message:capsulenameerror}
   try {
    return await newcapsuleModal(capsulename, userid)
   } catch (error) {
    throw new AppError({status:error.status, message:error.message})
   }
}
export const editcapsuleName = async(capsulename,capsuleid)=>{
    if (!capsulename || capsulename.length < mincharLimit) return {status:badRequest,message:capsulenameerror}
    if(!capsuleid) return {status:badRequest,message:capsuleiderror}
    try {
        return editcapsuleModal(capsulename,capsuleid);
    } catch (error) {
        throw new AppError({status:error.status, message:error.message})
    }
}
export const getallCaplsules = async(userid)=>{
        if(!userid)return {status:badRequest,message:useridAbsent}
        try {
            return getallcapsuleModal(userid)
        } catch (error) {
            
        }
}