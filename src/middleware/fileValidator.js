import { badRequest, filecountError, filesizeError, maxbatchUpload, uploadLimit } from "../utils/constant.js";

const fileValidator = (req,res,next)=>{
        const fileSize = req.body.size;
        const fileCount = req.body.fileCount
        if (fileSize > uploadLimit) return next({status:badRequest,message:filesizeError});
        if (fileCount > maxbatchUpload) return next({status:badRequest,message:filecountError});
        next()
}
export default fileValidator