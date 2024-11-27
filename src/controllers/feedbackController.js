import { feedbackService } from "../services/feedbackService.js";

const feedbackController = async(req,res,next)=>{
    const userId = req.user_id;
    const {bugs,features,improvements,suggestions} = req.body
    try {
        const {status,message} = await feedbackService(userId,bugs,features,improvements,suggestions)
        res.status(status).json({
            message: message
        })
    } catch (error) {
        next({ status: error.status, message: error.message })
    }
}
export default feedbackController