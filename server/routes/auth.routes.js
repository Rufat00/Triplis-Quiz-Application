const {Router} = require('express')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/reset-password', userController.resetPassword)
router.post('/activate', userController.activate)
router.post('/activation-code', userController.activationCode)
router.post('/upload-avatar', authMiddleware ,userController.uploadAvatar)
router.post('/change-name', authMiddleware ,userController.changeName)
router.post('/delete-account',userController.deleteAccount)
router.get('/refresh', userController.refresh)

module.exports = router