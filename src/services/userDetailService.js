import { userNameModal } from "../models/userDetailModal.js";
import { AppError } from "../utils/error.js";

export async function userNameService(userid){
    try {
        return await userNameModal(userid)
    } catch (error) {
        throw new AppError({status:error.status, message:error.message})
    }
}