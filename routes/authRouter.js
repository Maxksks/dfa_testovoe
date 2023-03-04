const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const {check} = require('express-validator')


router.post('/registration', [
    check('userName', "User name must not be empty").notEmpty(),
    check('password', "Password must be more then 4 symbols").isLength({min: 4})
], controller.registration)

router.post('/login', controller.login)

router.get('/user', authMiddleware, controller.getUser)

module.exports = router