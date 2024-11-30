import generateToken  from "../utils/generatetoken.js";
import loginModal from "../models/loginModal.js";
import { badRequest, invalidEmail} from "../utils/constant.js";
import dotenv from 'dotenv'
import { AppError } from "../utils/error.js";
dotenv.config()
export const authService = async(email,username)=>{
        if (!email || !username) return({ status: badRequest, message: invalidEmail })
       try {
        const {user_id, message,newuser , status} = await loginModal(email,username)
        const jwttoken =  generateToken(user_id);
        return {jwttoken,message,newuser,status};
       } catch (error) {
        throw new AppError({status:error.status,message:error.message})
       }
}