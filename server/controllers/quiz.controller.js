const quizService = require('../services/quiz.service')

class QuizController{

    async create(req, res, next) {
        try {
            
            const data = req.body

            if(
                data.author === "" ||
                data.create_date === "" ||
                data.describtion === "" ||
                ![15000,30000,60000].includes(data.duration) ||
                typeof(data.private) !==  'boolean' ||
                data.title === ""
            ){
                return res.status(400).json({message: 'Not Valid Inputs'})
            }

            if(data.questions.length < 1){
                return res.status(400).json({message: 'You need more questions'})
            }

            for(let i = 0; i < data.questions.length; i++){
                const question = data.questions[i]
                let valid = true

                question.answers.forEach((answer, index) => {
                    if(answer.answer === ''){
                        valid = false
                    }
                })

                if(question.question === ''){
                    return res.status(400).json({message: 'Your question shouldnt be empty'})
                }
                if(question.answers.length < 1 || valid !== true){
                    return res.status(400).json({message: 'Your question should has answer'})
                }
            }

            const info = await quizService.create(data)

            if(info.isError === true){
                return res.status(info.status).json({message: info.message})
            } 

            return res.status(200).json({message: 'successfuly created'})

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server Error'})
        }
    }


    async getOwnQuizzes(req, res, next) {
        try {

            const {id} = req.query

            const info = await quizService.getOwnQuizzes(id)
            if(info.isError === true){
                return res.status(info.status).json({message: info.message})
            }

            return res.status(200).json(info.payload)

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
        }
    }

    async delete(req, res, next){
        try {
            
            const id = req.params.id

            const info = await quizService.delete(id)
            if(info.isError === true){
                return res.status(info.status).json({message: info.message})
            }

            return res.status(200).json({message: 'deleted'})

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
            console.log(error);
        }
    }

    async getQuizzes(req, res, next ) {
        try {

            const data = await quizService.getQuizzes()
            if(data.isError === true){
                return res.status(data.status).json({message: data.message})
            }

            return res.status(200).json(data.payload)

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
            console.log(error);
        }
    }

    async connect(req, res, next ) {
        try {

            const {pin} = req.query
            const data = await quizService.connect(pin)

            if(data.isError === true){
                return res.status(data.status).json({message: data.message})
            }

            return res.status(200).json(data.payload)

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
            console.log(error);
        }
    }

}

module.exports = new QuizController()