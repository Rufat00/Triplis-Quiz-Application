const tokenService = require('../services/token.service')

module.exports = function(req,res,next){

    try { 
        const authorization = req.headers.authorization;
        if(!authorization){
            return next({status: 401})
        } 
        const accessToken = authorization.split(' ')[1]

        if(!accessToken){
            return next({status: 401})
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            return next({status: 401})
        }
 
        req.user = userData
        next()

    } catch (error) {
        return next(error);
    }
}