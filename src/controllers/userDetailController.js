import { userNameService } from "../services/userDetailService.js"

export async function userNameController(req,res,next){
    const userid = req.user_id
   try {
    const {status , message, username} = await userNameService(userid)
    res.status(status).json({
        username,
        message
    })
   } catch (error) {
    next({ status: error.status, message: error.message })
   }
}