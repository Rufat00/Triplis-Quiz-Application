const jwt = require('jsonwebtoken');
const User = require('../models/User')

class TokenService{

    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'20m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'3d'})
        return{accessToken,refreshToken}
    }

    async saveToken(id, refreshToken){
        const tokenData = await User.findOne({_id: id})
        if(tokenData){ 
            tokenData.refreshToken = refreshToken
            tokenData.save()
        }
    }

    async removeToken(refreshToken){
        
        const tokenData = await User.findOne({refreshToken: refreshToken})
        if(tokenData){
            tokenData.refreshToken = ""
            return tokenData.save()
        }
        return tokenData
    }

    async findToken(refreshToken){
        const tokenData = await User.findOne({refreshToken: refreshToken})
        return tokenData
    }

    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData

        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token){
        try {
            
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData

        } catch (error) {
            return null
        }
    }

}

module.exports = new TokenService()