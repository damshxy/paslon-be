import * as express from 'express'
import PaslonController from '../controllers/PaslonController'

const router = express.Router()
router.get('/paslons', PaslonController.index)
router.get('/paslon/:id', PaslonController.show)
router.post('/paslon', PaslonController.create)
router.patch('/paslon/:id', PaslonController.update)
router.delete('/paslon/:id', PaslonController.delete)



export default router