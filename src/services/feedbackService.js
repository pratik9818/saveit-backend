import { feedbackMode } from "../models/feedbackModal.js"
import { absentFeedbackField, badRequest, feedbackCharLimit, feedbackCharLimitError, loginError } from "../utils/constant.js"
import { AppError } from "../utils/error.js"

export const feedbackService = async(userid,bugs,features,improvements,suggestions,forwhat)=>{
    if(!bugs && !features && !improvements  && !suggestions && !forwhat)return {status:badRequest,message:absentFeedbackField}
    if(bugs.length > feedbackCharLimit || features.length > feedbackCharLimit || improvements.length > feedbackCharLimit || suggestions.length > feedbackCharLimit)return {status:badRequest,message:feedbackCharLimitError}
    
    try {
        return feedbackMode(userid,bugs,features,improvements,suggestions,forwhat)
    } catch (error) {
        throw new AppError({status:error.status, message:error.message})
    }
}