import * as express from 'express'
import PaslonController from '../controllers/PaslonController'
import uploadImage from '../middlewares/UploadImage'

const router = express.Router()
router.get('/paslons', PaslonController.find)
router.get('/paslon/:id', PaslonController.findOne)
router.post('/paslon', uploadImage.single('image'), PaslonController.create)
router.patch('/paslon/:id', uploadImage.single('image'), PaslonController.update)
router.delete('/paslon/:id', PaslonController.delete)



export default router