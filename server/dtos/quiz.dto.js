module.exports = class QuizDto{
    author
    author_avatar
    private
    title
    describtion
    main_image
    duration
    create_date
    likes
    dislikes
    id
    questions

    constructor(model){
        this.author = model.user.name
        this.author_avatar = model.user.avatar.url
        this.private = model.quiz.private
        this.title = model.quiz.title
        this.describtion = model.quiz.describtion
        this.main_image = model.quiz.main_image.url
        this.duration = model.quiz.duration
        this.create_date = model.quiz.create_date
        this.likes = model.quiz.likes
        this.dislikes = model.quiz.dislikes
        this.id = model.quiz._id
        this.questions = this.formatQuestions(model.quiz.questions)
    }

    formatQuestions(data){

        const notAllowed = [ '', null , NaN, undefined ]

        let questions = []

        data.forEach(question => {

            const image = notAllowed.includes( question.image.public_id) === true? null : question.image.url
            const answers = question.answers.map(answer => 
                answer = answer.answer    
            )

            questions.push({
                question: question.question,
                image: image,
                answers: answers
            })

        });

        return questions

    }
}