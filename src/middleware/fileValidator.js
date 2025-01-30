import convertbytestoMb from "../utils/bytestoMb.js";
import { badRequest, filecountError, filenamecharLimit, filenameError, filesizeError, maxbatchUpload, missingkey, success, successful, uploadLimit } from "../utils/constant.js";

const fileValidator = (req,res)=>{
        const fileSize = convertbytestoMb(req.body.size);
        const fileCount = req.body.fileCount
        const fileName = req.body.fileNames;
        if(!fileSize || !fileCount | !fileName.length) res.status(badRequest).json({status:badRequest,message:missingkey});
        if (fileSize > uploadLimit) return res.status(badRequest).json({status:badRequest,message:filesizeError});
        if (fileCount > maxbatchUpload) return res.status(badRequest).json({status:badRequest,message:filecountError});
        res.status(successful).json({status:successful,message:"file size and count is valid"})

}
export default fileValidator