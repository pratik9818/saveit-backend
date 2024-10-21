import { filefragmentModal,textfragmentModal,getfragmentModal,fragmenttagModal, fragmenttextcontentModal, deletebatchfragmentModal, downloadfilefragmentModal } from "../models/fragmentModal.js"
import { absentdeleteFragmentsIds, badRequest, missingkey, tagcharError, tagcharLimit, textcharLimit, textcharlimitExceed, useridAbsent } from "../utils/constant.js"
import { AppError } from "../utils/error.js"

export const filefragmentService = async (capsuleid, size, tag, userid,filetype,filename) => {
    
    if (!userid) return { status: badRequest, message: useridAbsent }
    if (!capsuleid || !size || !filetype || !filename) return { status: badRequest, message: missingkey }
    if(!tag) tag = null; //need to test this
    try {
        return await filefragmentModal(capsuleid, size, tag, userid ,filetype,filename)
    } catch (error) {
        throw new AppError({ status: error.status, message: error.message })
    }
}
export const textfragmentService = async (capsuleid, size, tag, textcontent,userid) => {
    if (!userid) return { status: badRequest, message: useridAbsent }
    const textcharLength = textcontent.length;
    if (!textcharLength ) return { status: badRequest, message: missingkey }
    if (textcharLimit < textcharLength ) return { status: badRequest, message: textcharlimitExceed }
    if (!capsuleid || !size ) return { status: badRequest, message: missingkey }
    if(!tag) tag = null; //need to test this
    try {
        return await textfragmentModal(capsuleid, size, tag, textcontent,userid)
    } catch (error) {
        throw new AppError({ status: error.status, message: error.message })
    }
}
export const getFragmentsService = async (createdat, userid ,capsuleid) => {
    if (!userid) return { status: badRequest, message: useridAbsent }
    if (!createdat || !capsuleid) return { status: badRequest, message: missingkey }
    try {
        return await getfragmentModal(createdat, userid,capsuleid)
    } catch (error) {
        throw new AppError({ status: error.status, message: error.message })
    }
}
export const fragmenttagService = async (tag,fragmentid,userid) => {
    if (!userid) return { status: badRequest, message: useridAbsent }
    if (!tag || !fragmentid) return { status: badRequest, message: missingkey }
    if(tag.length > tagcharLimit) return { status: badRequest, message: tagcharError }
    try {
        return await fragmenttagModal(tag,fragmentid)
    } catch (error) {
        throw new AppError({ status: error.status, message: error.message })
    }
}
export const updatetextcontentService = async (textcontent,fragmentid,userid) => {
    if (!userid) return { status: badRequest, message: useridAbsent }
    if (!textcontent || !fragmentid) return { status: badRequest, message: missingkey }
    const textcharLength = textcontent.length;
    if (textcharLimit < textcharLength ) return { status: badRequest, message: textcharlimitExceed }
    try {
        return await fragmenttextcontentModal(textcontent,fragmentid)
    } catch (error) {
        throw new AppError({ status: error.status, message: error.message })
    }
}
export const batchdeleteFragmentService = async(fragmentids,userid)=>{
    if(!userid)return {status:badRequest,message:useridAbsent}
    if(!fragmentids.length)return {status:badRequest,message:absentdeleteFragmentsIds}
    try {
        return deletebatchfragmentModal(fragmentids)
    } catch (error) {
        throw new AppError({status:error.status, message:error.message})
    }
}
export const downloadfileService = async(fragmentid,userid)=>{
    if(!userid)return {status:badRequest,message:useridAbsent}
    if(!fragmentid)return {status:badRequest,message:missingkey}
    try {
        return downloadfilefragmentModal(fragmentid)
    } catch (error) {
        throw new AppError({status:error.status, message:error.message})
    }
}