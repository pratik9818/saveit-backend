import { authService } from '../services/authService.js';
import { successfullylogin, tokenAge } from '../utils/constant.js';
 const authController = async (req, res, next) => {
    const email = req.email
    const username = req.username
    try {
        const {jwttoken,message,newuser,status} = await authService(email,username)
        
        res.cookie('accessToken', jwttoken , {httpOnly:true,secure:false,sameSite:'Lax',maxAge:tokenAge})
        res.status(status).json({
            message:message,
            isuserNew : newuser
        })
    } catch (error) {
        next({status:error.status, message :error.message})
    }
}

export default authController