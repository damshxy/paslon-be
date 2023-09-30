import * as express from 'express'
import PaslonController from '../controllers/PaslonController'

const router = express.Router()
router.get('/paslons', PaslonController.find)
router.get('/paslon/:id', PaslonController.findOne)
router.post('/paslon', PaslonController.create)
router.patch('/paslon/:id', PaslonController.update)
router.delete('/paslon/:id', PaslonController.delete)



export default router