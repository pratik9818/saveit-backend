import jwt, { decode } from 'jsonwebtoken'
import  dotenv  from 'dotenv'
import { AppError } from '../utils/error.js'
import { badRequest, invalidtoken, tokenAbsent, unauthorized } from '../utils/constant.js'
dotenv.config()
const secret_key = process.env.JWT_SECRET

const verifyToken = (req,res,next) =>{
    let token = req.cookies.accessToken
    
    jwt.verify(token,secret_key , (err, decoded)=>{
        if(!token){
            const err = new Error(tokenAbsent);
            err.status = badRequest; // Bad Request
            return next(err); // Pass the error to the error handler
        }
        if(err){
            // throw new AppError({ status:unauthorized, message: invalidtoken });
            const err = new Error(invalidtoken);
            err.status = unauthorized; // Bad Request
            return next(err)
        }
        
        req.user_id = decoded.user_id;
        next()
    })
}

export default verifyToken