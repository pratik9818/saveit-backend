import express from 'express'
import authController from '../controllers/authController.js'
import { sortcapsulesbyDatecreated, createCapsule, editCapsule, sortcapsulesbySize ,getcapsules,searchCapsules,deleteCapsules} from '../controllers/capsuleController.js'
import verifyToken from '../middleware/verifytoken.js'
import verifygoogleToken from '../middleware/verifygoogleToken.js'
import { uploadPresignedurl } from '../controllers/presignedurlController.js'
import fileValidator from '../middleware/fileValidator.js'
import { fileFragment ,textFragment ,getFragments,fragmentTag ,updatetextContent,deleteFragments,downloadFile,searchFragments,filterFragments,filterdocsFragments} from '../controllers/fragmentController.js'
import logoutController from '../controllers/logoutController.js'
import feedbackController from '../controllers/feedbackController.js'
const router = express.Router()

router.post('/auth/google',verifygoogleToken,authController)
router.post('/logout',verifyToken,logoutController)
// router.post('/subscriptiondetails',verifygoogleToken,subscriptiondetailsController)
router.post('/capsules',verifyToken ,createCapsule)
router.put('/capsule/:capsuleid',verifyToken,editCapsule)
router.get('/capsules',verifyToken, getcapsules)
router.get('/capsules/filter/date',verifyToken, sortcapsulesbyDatecreated)
router.get('/capsules/filter/size',verifyToken, sortcapsulesbySize)
router.get('/capsules/search',verifyToken, searchCapsules)
router.delete('/capsules',verifyToken, deleteCapsules)

router.put('/presignedurl/upload',verifyToken,fileValidator,uploadPresignedurl)
router.post('/fragments/files',verifyToken,fileFragment)
router.post('/fragments/text',verifyToken, textFragment)
router.get('/fragments',verifyToken, getFragments) 
router.put('/fragments/tag',verifyToken, fragmentTag)
router.put('/fragments/text',verifyToken, updatetextContent)
router.delete('/fragments',verifyToken, deleteFragments)
router.get('/fragments/files/download',verifyToken, downloadFile)
router.get('/fragments/search',verifyToken,searchFragments)
router.get('/fragments/filter/:filtertype',verifyToken,filterFragments)
router.get('/fragments/filter/other/docs',verifyToken,filterdocsFragments)

router.post('/feedback',verifyToken, feedbackController)


export default router
