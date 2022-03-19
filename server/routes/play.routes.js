const {Router} = require('express')
const playController = require('../controllers/play.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.get('/play', authMiddleware ,playController.play)
router.get('/check', authMiddleware ,playController.check)
router.post('/results', authMiddleware ,playController.results)

module.exports = router