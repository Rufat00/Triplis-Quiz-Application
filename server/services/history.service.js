const Quiz = require('../models/Quiz')
const User = require('../models/User')
const error = require('../functions/error.function')
const success = require('../functions/success.function')

class HistoryService{

    async getHistory(id) {

        const user = await User.findOne({_id: id})
        if(!user){
            return error('Server Problems try to refresh page',500)
        }
        const scores = []

        for(let i = 0; i < user.scores.length; i++){
            const score = user.scores[i]

            await Quiz.findById(score.quiz).then(quiz=>{
                scores.push({
                    score,
                    title: quiz.title
                })
            })
        }
        const data = {scores: scores, record: user.record}
        return success(data)

    }

    async deleteHistory(id, scoreId) {

        const user = await User.findOne({_id: id})
        if(!user){
            return error('Server Problems try to refresh page',500)
        }
        user.scores.pull({_id: scoreId})
        await user.save()
        
        const scores = []

        for(let i = 0; i < user.scores.length; i++){
            const score = user.scores[i]

            await Quiz.findById(score.quiz).then(quiz=>{
                scores.push({
                    score,
                    title: quiz.title
                })
            })
        }

        const data = {scores: scores, record: user.record}
        return success(data)
    }

}

module.exports = new HistoryService()