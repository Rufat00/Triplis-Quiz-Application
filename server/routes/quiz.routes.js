const {Router} = require('express')
const quizController = require('../controllers/quiz.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.post('/create', authMiddleware ,quizController.create)
router.delete('/delete/:id', authMiddleware ,quizController.delete)
router.get('/get-quizzes', authMiddleware ,quizController.getQuizzes)
router.get('/get-own-quizzes', authMiddleware ,quizController.getOwnQuizzes)
router.get('/connect', authMiddleware ,quizController.connect)

module.exports = router