import { OAuth2Client } from "google-auth-library";
import dotenv from 'dotenv'
import { AppError } from '../utils/error.js'
import { badRequest, googletokenAbsent, internalserverError, verifygoogletokenError} from "../utils/constant.js";
dotenv.config()
const client = new OAuth2Client()
const clientId = process.env.GOOGLE_CLIENT

const verifygoogleToken  = async (req,res,next)=>{
    const googleToken = req?.body.token
    
    if(!googleToken) throw new AppError({status:badRequest,message:googletokenAbsent})
        try {
         const res = await client.verifyIdToken({
                 idToken:googleToken,
                 audience:clientId
         })
         const {email,name} = res.getPayload()
         
         req.email = email;
         req.username = name;
         next()
        } catch (error) {
                console.log(error);
                
         next({status:internalserverError,message:verifygoogletokenError})
        }
}
export default verifygoogleToken;