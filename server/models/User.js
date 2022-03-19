const {Schema,model} = require('mongoose')

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    avatar: {
        url: {type: String, default: process.env.DEFAULT_AVATAR},
        public_id: {type: String, default: process.env.DEFAULT_AVATAR_ID}
    },
    record: {
        true: {type: Number, default: 0},
        time: {type: Number, default: 0},
        procent: {type: Number, default: 0},
    },
    scores: [{
        quiz: {type: String},
        corrects: {type: Number},
        time: {type: Number},
        procent: {type: Number},
        date: {type: Date}
    }],
    refreshToken: {type: String},
    isActivated: {type: Boolean, default: false},
    activationCode: {type: String},
})

module.exports = model('User', User) 