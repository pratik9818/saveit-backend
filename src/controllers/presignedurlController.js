import { uploadPresignedurlService } from "../services/presignedurlService.js"

export const uploadPresignedurl = async (req, res,next) => {
    const userId = req.user_id
    const fileName = req.body.fileName //in s3 filename must be unique 
    try {
        const { status, message, data } = await uploadPresignedurlService(userId,fileName)
        
        res.status(status).json({
            message: message,
            url:data
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}