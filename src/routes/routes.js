import express from 'express'
import authController from '../controllers/authController.js'
import { getCaplsules, createCapsule, editCapsule } from '../controllers/capsuleController.js'
import verifyToken from '../middleware/verifytoken.js'
import verifygoogleToken from '../middleware/verifygoogleToken.js'
const router = express.Router()

router.post('/auth/google',verifygoogleToken,authController)
router.post('/capsules',verifyToken ,createCapsule)
router.put('/capsule/:capsuleid',verifyToken,editCapsule)
router.get('/capsules',verifyToken, getCaplsules)
export default router
