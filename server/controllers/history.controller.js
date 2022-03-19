const historyService = require('../services/history.service')

class HistoryController{

    async getHistory(req, res, next) {
        try {
            
            const {id} = req.query
            const info = await historyService.getHistory(id)

            if(info.isError === true){
                return res.status(info.status).json({message: info.message})
            }

            return res.status(200).json(info.payload)

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
            console.log(error);
        }
    }

    async deleteHistory(req, res, next) {
        try {
            
            const {id, scoreId} = req.query
            
            const info = await historyService.deleteHistory(id, scoreId)
            if(info.isError === true){
                return res.status(info.status).json({message: info.message})
            }

            return res.status(200).json(info.payload)

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
            console.log(error);
        }
    }
}

module.exports = new HistoryController()