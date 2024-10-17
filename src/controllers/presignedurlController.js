import { uploadPresignedurlService } from "../services/presignedurlService.js"

export const uploadPresignedurl = async (req, res,next) => {
    const userId = req.user_id
    try {
        const { status, message, data } = await uploadPresignedurlService(userId)
        console.log(status, message, data);
        
        res.status(status).json({
            message: message,
            url:data
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}