import jwt from 'jsonwebtoken'
import  dotenv  from 'dotenv'
import { AppError } from '../utils/error.js'
import { badRequest, invalidtoken, tokenAbsent, unauthorized } from '../utils/constant.js'
dotenv.config()
const secret_key = process.env.JWT_SECRET

const verifyToken = (req,res,next) =>{
    const token = req.cookies.accessToken
    
    jwt.verify(token,secret_key , (err, decoded)=>{
        if(!token){
            throw new AppError({ status: badRequest ,error:tokenAbsent });
        }
        if(err){
            throw new AppError({ status:unauthorized, message: invalidtoken });
        }
        req.user_id = decoded.user_id;
        next()
    })
}

export default verifyToken