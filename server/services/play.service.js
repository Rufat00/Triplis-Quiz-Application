const Quiz = require('../models/Quiz')
const User = require('../models/User')
const error = require('../functions/error.function')
const success = require('../functions/success.function')
const QuizDto = require('../dtos/quiz.dto')


class PlayService{

    async play(id){

        const quiz = await Quiz.findById(id)
        if(!quiz){
            return error('This quiz is not exist',404)
        }
        const user = await User.findById(quiz.author)
        if(!user){
            return error('Server Problems try to refresh page',500)
        }
        const data = {user, quiz}
        const readyData = new QuizDto(data)

        return success(readyData)

    }

    async check(id,question) {

        const quiz = await Quiz.findById(id)
        if(!quiz){
            return error('This quiz is not exist',404)
        }
        const data = quiz.questions[question].answers
        return success(data)

    }

    async results(data){

        const user = await User.findOne({_id: data.id})
        if(!user){
            return error('Server Problems try to refresh page',500)
        }

        user.scores.forEach(element => {
            if(element.quiz === data.results.quiz){
                user.scores.pull({_id: element._id})
            }
        });

        user.scores.unshift({
            ...data.results
        })

        if(user.record.true <= data.results.corrects && user.record.procent <= data.results.procent && user.record.time < data.results.time){
            user.record = {
                true: data.results.corrects,
                time: data.results.time,
                procent: data.results.procent
            }
        }

        await user.save()
        await this.sendGrade(data.grade.id, data.grade.type)

        return success()
    }
    
    async sendGrade(id,type) {

        const quiz = await Quiz.findById(id)
        if(!quiz){
            return error('This quiz is not exist',404)
        }

        switch(type){
            case 'like':
                quiz.likes += 1
                quiz.save()
                return success('Thanks for the community support')

            case 'dislike':
                quiz.dislikes += 1
                quiz.save()
                return success('Thanks for the community support')

            default: 
                return success('Please rate the quiz next time')
        }
    }
}

module.exports = new PlayService()