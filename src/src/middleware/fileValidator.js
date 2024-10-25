import convertbytestoMb from "../utils/bytestoMb.js";
import { badRequest, filecountError, filenamecharLimit, filenameError, filesizeError, maxbatchUpload, missingkey, uploadLimit } from "../utils/constant.js";

const fileValidator = (req,res,next)=>{
        const fileSize = convertbytestoMb(req.body.size);
        const fileCount = req.body.fileCount
        const fileName = req.body.fileName;
        if(!fileSize || !fileCount)return next({status:badRequest,message:missingkey});
        if (!fileName || fileName.length < filenamecharLimit) return next({status:badRequest,message:filenameError});
        if (fileSize > uploadLimit) return next({status:badRequest,message:filesizeError});
        if (fileCount > maxbatchUpload) return next({status:badRequest,message:filecountError});
        next()
}
export default fileValidator