import { AppError } from "../utils/error.js"
import { badRequest, capsulenameerror,capsuleiderror, dateError, orderMissing, capsulessizeError, useridAbsent, searchvalueError, absentdeleteCapsuleIds, capsuleDeleteLimit, capsuledeletelimitError, capsuleNameCharLimit, capsuleNameCharLimitError } from "../utils/constant.js"
import {newcapsuleModal, getcapsulesortbyDatecreatedModal,getcapsulesearchModal, getcapsulesbyDatemodifiedModal,editcapsuleModal, getcapsulesortbysizeModal, deletebatchcapsulesModal } from "../models/capsuleModals.js"

export const newCapsule = async (capsulename, userid) => {
    if (!capsulename.length ) return {status:badRequest,message:capsulenameerror}
    if(capsulename.length > capsuleNameCharLimit)return {status:badRequest,message:capsuleNameCharLimitError}
   try {
    return await newcapsuleModal(capsulename, userid)
   } catch (error) {
    throw new AppError({status:error.status, message:error.message})
   }
}
export const editcapsuleName = async(capsulename,capsuleid,userid)=>{
    if (!capsulename.length) return {status:badRequest,message:capsulenameerror}
    if(!capsuleid) return {status:badRequest,message:capsuleiderror}
    if(!userid)return {status:badRequest,message:useridAbsent}
    try {
        return editcapsuleModal(capsulename,capsuleid,userid);
    } catch (error) {
        throw new AppError({status:error.status, message:error.message})
    }
}
export const getcapsulesbyDatemodified = async(datemodified,userid)=>{
    if(!datemodified)return {status:badRequest,message:dateError}
        if(!userid)return {status:badRequest,message:useridAbsent}
        try {
            return getcapsulesbyDatemodifiedModal(datemodified,userid)
        } catch (error) {
            throw new AppError({status:error.status, message:error.message})
        }
}
export const getcaplsulesSortbyDatecreated = async(order,date,userid)=>{
        if(!order)return {status:badRequest,message:orderMissing}
        if(!date)return {status:badRequest,message:dateError}
        if(!userid)return {status:badRequest,message:useridAbsent}
        try {
            return getcapsulesortbyDatecreatedModal(order,date,userid)
        } catch (error) {
            throw new AppError({status:error.status, message:error.message})
        }
}
export const getcaplsulesSortbySize = async(order,size,userid)=>{
        if(!order)return {status:badRequest,message:orderMissing}
        if(!size)return {status:badRequest,message:capsulessizeError}
        if(!userid)return {status:badRequest,message:useridAbsent}
        try {
            return getcapsulesortbysizeModal(order,size,userid)
        } catch (error) {
            throw new AppError({status:error.status, message:error.message})
        }
}
export const getsearchCapsules = async(searchvalue,userid)=>{
        if(!searchvalue)return {status:badRequest,message:searchvalueError}
        if(!userid)return {status:badRequest,message:useridAbsent}
        try {
            return getcapsulesearchModal(searchvalue,userid)
        } catch (error) {
            throw new AppError({status:error.status, message:error.message})
        }
}
export const batchdeleteCapsules = async(capsuleIds,userid)=>{
        if(!capsuleIds.length)return {status:badRequest,message:absentdeleteCapsuleIds}
        if(capsuleIds.length > capsuleDeleteLimit)return {status:badRequest,message:capsuledeletelimitError}
        if(!userid)return {status:badRequest,message:useridAbsent}
        try {
            return deletebatchcapsulesModal(capsuleIds,userid)
        } catch (error) {
            throw new AppError({status:error.status, message:error.message})
        }
}