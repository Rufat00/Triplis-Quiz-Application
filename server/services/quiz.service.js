const Quiz = require('../models/Quiz')
const generatePin = require('../functions/generatePin')
const { cloudinary } = require('../utils/storage')
const error = require('../functions/error.function')
const success = require('../functions/success.function')
const ContentDto = require('../dtos/content.dto')


class QuizService{

    notAllowed = [ '', null , NaN, undefined ]

    async create (data) {

        let readyData = data 

        const pin = await generatePin()

        if(!this.notAllowed.includes( readyData.main_image)){

            await cloudinary.uploader.upload(readyData.main_image,{upload_preset: process.env.MAIN_UPLOAD_PRESET})
            .then(main_image=>{

                readyData.main_image = {
                    url: main_image.url,
                    public_id: main_image.public_id,
                }

            })
        }

        readyData.duration = parseInt(readyData.duration)

        for(let i = 0; i < readyData.questions.length + 1; i++){

            if(i === readyData.questions.length){
                await Quiz.create({...readyData, pin: pin})
                break;
            }

            const question = readyData.questions[i]

            if(!this.notAllowed.includes( question.image)){

                await cloudinary.uploader.upload(question.image,{upload_preset: process.env.MAIN_UPLOAD_PRESET})
                .then(image=>{

                    readyData.questions[i].image = {
                        url: image.url,
                        public_id: image.public_id,
                    }
                })

            }

        }

        return success(null)
    }

    async delete (id) {

        const quiz = await Quiz.findById(id)
        if(!quiz){
            return error('This quiz is not exist', 404)
        }

        if(!this.notAllowed.includes( quiz.main_image.public_id )){
            await cloudinary.uploader.destroy(quiz.main_image.public_id)
        }

        for(let i = 0; i < quiz.questions.length + 1; i++){

            if(i === quiz.questions.length){
                await Quiz.deleteOne({_id: id})
                break;
            }

            const question = quiz.questions[i]

            if(!this.notAllowed.includes( question.image.public_id )){
                await cloudinary.uploader.destroy(question.image.public_id)
            }

        }
        
        return success(null)
    }

    async getOwnQuizzes(id) {

        const data = await Quiz.find({author: id})

        if(data.length < 1){
            return error('You have no quizzes then lets create one !', 404)
        }

        return success(data)

    }

    async getQuizzes() {
        const data = await Quiz.find({private: false})

        if(data.length < 1){
            return error('There is no public quizzes yet :(', 404)
        }

        const content = data.map(quiz =>{
            const content = new ContentDto(quiz)
            return {...content}
        })

        return success(content)
    }

    async connect(pin) {

        const data = await Quiz.findOne({pin: pin})
        if(!data){
            return error('Quiz with this pin is not exist', 404)
        }

        return success(data._id)

    }

}

module.exports = new QuizService()