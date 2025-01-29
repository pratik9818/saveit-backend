import { uploadPresignedurlService } from "../services/presignedurlService.js"

export const uploadPresignedurl = async (req, res,next) => {
    const userId = req.user_id
    const fileNames = req.body.fileNames //in s3 filename must be unique 
    try {
        const { status, message, urls } = await uploadPresignedurlService(userId,fileNames)
        
        res.status(status).json({
            message: message,
            presignedUrls:urls
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}