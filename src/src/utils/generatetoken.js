import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { badRequest, tokenAbsent, tokenAge } from './constant.js';
import { AppError } from './error.js';
dotenv.config()
const secret_key = process.env.JWT_SECRET;

const generateToken = (user_id) => {
    if(!user_id) throw new AppError({status:badRequest,message:tokenAbsent})
    const expirestoken = tokenAge   // 3600 * 24 * 90 - 3 month expiration time
    return jwt.sign({ user_id }, secret_key, { expiresIn: expirestoken });
};
export default generateToken;