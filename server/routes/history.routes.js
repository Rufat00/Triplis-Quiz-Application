const {Router} = require('express')
const historyController = require('../controllers/history.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.get('/get-history', authMiddleware ,historyController.getHistory)
router.delete('/delete-history', authMiddleware ,historyController.deleteHistory)

module.exports = router