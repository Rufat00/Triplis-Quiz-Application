const {Schema,model} = require('mongoose')

const Quiz = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    private: {type: Boolean, default: false},
    title: {type: String, required: true},
    describtion: {type: String},
    pin: {type: String, required: true},

    main_image: {
        url: {type: String, default: null},
        public_id: {type: String, default: null}
    },

    duration: {type: Number, default: 15000},
    create_date: {type: Date, default: new Date()},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},

    questions: [{
        question: {type: String, required: true},
        image: {
            url: {type: String, default: null},
            public_id: {type: String, default: null}
        },
        answers: [{
            answer: {type: String, required: true},
            correct: {type: Boolean, default: false}
        }] 
    }]

})

module.exports = model('Quiz', Quiz) 