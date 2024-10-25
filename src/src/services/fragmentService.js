import { filefragmentModal,textfragmentModal,getfragmentModal,fragmenttagModal, fragmenttextcontentModal, deletebatchfragmentModal, downloadfilefragmentModal, getfragmentssearchModal, fragmentsfilterModal, fragmentsdocsfilterModal } from "../models/fragmentModal.js"
import { absentdeleteFragmentsIds, badRequest, capsuleiderror, fragmentDeleteLimit, fragmentdeletelimitError, fragmenttypeAbsent, missingkey, searchvalueError, tagcharError, tagcharLimit, textcharLimit, textcharlimitExceed, useridAbsent } from "../utils/constant.js"
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
export const batchdeleteFragmentService = async(fragmentids,userid,capsuleid)=>{
    if(!userid)return {status:badRequest,message:useridAbsent}
    if(!fragmentids.length)return {status:badRequest,message:absentdeleteFragmentsIds}
    if(fragmentids.length > fragmentDeleteLimit)return {status:badRequest,message:fragmentdeletelimitError}
    if(!capsuleid)return {status:badRequest,message:capsuleiderror}
    try {
        return deletebatchfragmentModal(fragmentids,userid,capsuleid)
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
export const getsearchFragments = async(searchvalue,userid,capsuleid)=>{
    if(!searchvalue)return {status:badRequest,message:searchvalueError}
    if(!capsuleid)return {status:badRequest,message:capsuleiderror}
    if(!userid)return {status:badRequest,message:useridAbsent}
    try {
        return getfragmentssearchModal(searchvalue,capsuleid)
    } catch (error) {
        throw new AppError({status:error.status, message:error.message})
    }
}
export const filterfragmentsService = async(fragmenttype,userid,capsuleid,createdat)=>{
    if(!userid)return {status:badRequest,message:useridAbsent}
    if(!fragmenttype)return {status:badRequest,message:fragmenttypeAbsent}
    if(!capsuleid)return {status:badRequest,message:capsuleiderror}
    if(!createdat)return {status:badRequest,message:missingkey}
    try {
        return fragmentsfilterModal(fragmenttype,capsuleid,createdat)
    } catch (error) {
        throw new AppError({status:error.status, message:error.message})
    }
}
export const filterdocsfragmentsService = async(userid,capsuleid,createdat)=>{
    if(!userid)return {status:badRequest,message:useridAbsent}
    if(!capsuleid)return {status:badRequest,message:capsuleiderror}
    if(!createdat)return {status:badRequest,message:missingkey}
    try {
        return fragmentsdocsfilterModal(capsuleid,createdat)
    } catch (error) {
        throw new AppError({status:error.status, message:error.message})
    }
}