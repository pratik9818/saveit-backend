import express from 'express'
import authController from '../controllers/authController.js'
import { sortcapsulesbyDatecreated, createCapsule, editCapsule, sortcapsulesbySize ,getcapsules,searchCapsules,deleteCapsules} from '../controllers/capsuleController.js'
import verifyToken from '../middleware/verifytoken.js'
import verifygoogleToken from '../middleware/verifygoogleToken.js'
const router = express.Router()

router.post('/auth/google',verifygoogleToken,authController)
router.post('/capsules',verifyToken ,createCapsule)
router.put('/capsule/:capsuleid',verifyToken,editCapsule)
router.get('/capsules',verifyToken, getcapsules)
router.get('/capsules/filter/date',verifyToken, sortcapsulesbyDatecreated)
router.get('/capsules/filter/size',verifyToken, sortcapsulesbySize)
router.get('/capsules/search',verifyToken, searchCapsules)
router.delete('/capsules',verifyToken, deleteCapsules)
export default router
