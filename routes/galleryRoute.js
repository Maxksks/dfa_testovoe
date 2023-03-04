const Router = require('express')
const router = new Router()
const controller = require('../controllers/gallaryController')
const uploadMiddleware = require('../middleware/uploadMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


router.post('/', [
    roleMiddleware(['admin', 'user']),
    uploadMiddleware.single('image')
], controller.uploadImage)

router.get('/', roleMiddleware(['admin', 'user']), controller.getAllImages)
router.get('/:id', roleMiddleware(['admin', 'user']), controller.getImage)

router.patch('/:id', [
    uploadMiddleware.single('image'),
    roleMiddleware(['admin', 'user'])
], controller.updateImage)

router.delete('/:id', roleMiddleware(['admin', 'user']), controller.deleteImage)

router.delete('/', roleMiddleware(['admin']), controller.deleteAll)

module.exports = router