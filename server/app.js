const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT
}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/history', require('./routes/history.routes'))
app.use('/api/quiz', require('./routes/quiz.routes'))
app.use('/api/play', require('./routes/play.routes'))

const start = async () => {
    try {
        
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, ()=> console.log('server started'))

    } catch (error) {
        console.log(error);
    }
} 
 
start()  