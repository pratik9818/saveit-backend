import express from 'express'
import authController from '../controllers/authController.js'
import { createCapsule, editCapsule } from '../controllers/capsuleController.js'
import verifyToken from '../middleware/verifytoken.js'
import verifygoogleToken from '../middleware/verifygoogleToken.js'
const router = express.Router()

router.post('/auth/google',verifygoogleToken,authController)
router.post('/capsules',verifyToken ,createCapsule)
router.put('/capsules/:capsuleid',verifyToken,editCapsule)
export default router
