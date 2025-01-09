import { authService } from '../services/authService.js';
import { tokenAge } from '../utils/constant.js';
 const authController = async (req, res, next) => {
    const email = req.email
    const username = req.username || 'extension'
    const client = req.body.client
    try {
        const {jwttoken,message,newuser,status} = await authService(email,username)
        if(client === 'extension'){
            return res.status(status).json({
                message:message,
                isuserNew : newuser,
                token:jwttoken
            })
        }
        res.cookie('accessToken', jwttoken , {httpOnly:true,secure:true,sameSite:'None',maxAge:tokenAge})
        res.status(status).json({
            message:message,
            isuserNew : newuser
        })
    } catch (error) {
        next({status:error.status, message :error.message})
    }
}

export default authController