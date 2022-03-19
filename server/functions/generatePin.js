const Quiz = require('../models/Quiz')
const uuid = require('uuid')

const genetatePin = async () => {

    const pin = uuid.v4().substr(0,8)

    const isCreated = await Quiz.findOne({pin: pin})

    if(isCreated){
        return genetatePin()
    }
    
    return pin
}

module.exports = genetatePin