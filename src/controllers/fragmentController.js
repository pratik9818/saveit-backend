import { filefragmentService ,textfragmentService,getFragmentsService, fragmenttagService, updatetextcontentService,batchdeleteFragmentService, downloadfileService } from "../services/fragmentService.js";

export const fileFragment = async(req,res,next)=>{
    const userId = req.user_id;
    const {capsuleId ,size,tag ,fileType,fileName} = req.body;
    
    try {
        const {status,message} = await filefragmentService(capsuleId ,size,tag,userId,fileType,fileName)
        
        res.status(status).json({
            message: message,
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}
export const textFragment = async(req,res,next)=>{
    const userId = req.user_id;
    const size=  req.headers['content-length'];
    
    const {capsuleId ,tag , textContent} = req.body;
    
    try {
        const {status,message} = await textfragmentService(capsuleId ,size,tag,textContent,userId)
        
        res.status(status).json({
            message: message,
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}
export const getFragments = async(req,res,next)=>{
    const userId = req.user_id;
    const createdAt = req.query.createdAt;
    // const createdAt = new Date().toUTCString();
    const capsuleId = req.query.capsuleId;
    
    try {
        const {status,message,data} = await getFragmentsService(createdAt, userId,capsuleId)
        
        res.status(status).json({
            message: message,
            data:data
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}
export const fragmentTag = async(req,res,next)=>{
    const userId = req.user_id;
    const {tag,fragmentId} = req.body;
    
    try {
        const {status,message} = await fragmenttagService(tag,fragmentId,userId)
        
        res.status(status).json({
            message: message,
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}
export const updatetextContent = async(req,res,next)=>{
    const userId = req.user_id;
    const {textContent,fragmentId} = req.body;
    
    try {
        const {status,message} = await updatetextcontentService(textContent,fragmentId,userId)
        
        res.status(status).json({
            message: message,
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}
export const deleteFragments = async(req,res,next)=>{
    const {fragmentIds} = req.body;
    const userId = req.user_id;
    try {
        const {status,message,rowdelete} = await batchdeleteFragmentService(fragmentIds,userId)
        res.status(status).json({
            message: message,
            rowdeleted:rowdelete
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}
export const downloadFile = async(req,res,next)=>{
    const userId = req.user_id;
    const {fragmentId} = req.body;
    try {
        const {status,message,downloadcount} = await downloadfileService(fragmentId,userId)
        res.status(status).json({
            message: message,
            downloadcount:downloadcount
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}