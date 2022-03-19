const playService = require('../services/play.service')

class PlayController{

    async play(req, res, next) {
        try {
            
            const {id} = req.query
            
            const data = await playService.play(id)
            if(data.isError === true){
                return res.status(data.status).json({message: data.message})
            }

            return res.status(200).json(data.payload)

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
        }
    }

    async check(req, res, next) {
        try {
            
            const {id, question} = req.query
            const data = await playService.check(id,question)
            if(data.isError === true){
                return res.status(data.status).json({message: data.message})
            }

            return res.status(200).json(data.payload)

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
            console.log(error);
        }
    }

    async results(req, res, next) {
        try {
            
            const data = req.body
            const info = await playService.results(data)
            if(info.isError === true){
                return res.status(info.status).json({message: info.message})
            }

            return res.status(200).json("Thanks for play")

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
            console.log(error);
        }
    }

}

module.exports = new PlayController()