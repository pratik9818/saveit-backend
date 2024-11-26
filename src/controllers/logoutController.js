import logoutModal from "../models/logoutModal.js";

const logoutController = async (req,res,next)=> {
    const userId = req.user_id;
    
    try {
        const {status , message ,login} = await logoutModal(userId)
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: "lax",
          });
    
          res.status(status).json({ message: message ,login});
        
    } catch (error) {
        next({status:error.status, message :error.message})
    }
}

export default logoutController