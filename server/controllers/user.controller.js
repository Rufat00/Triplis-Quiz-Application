const UserService = require('../services/user.service')

class UserController{

    async registration(req, res, next) {
        try {
            
            const {email, password, name} = req.body
            const userData = await UserService.registration(email, password, name)

            if(userData.isError === true){
                return res.status(userData.status).json({message: userData.message})
            }

            return res.status(200).json({message: 'Valid account'})

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
        }
    }

    async login(req, res, next) {
        try {
            
            const {email, password} = req.body
            const userData = await UserService.login(email, password)

            if(userData.isError === true){
                return res.status(userData.status).json({message: userData.message})
            }

            res.cookie('refreshToken', userData.payload.refreshToken, {maxAge: (3 * 24 * 60 * 60 * 1000), httpOnly: true, sameSite: 'none', secure: true})
            return res.json(userData.payload)


        } catch (error) { 
            res.status(500).json({message: 'Server Error'}) 
        }
    }

    async logout(req, res, next) {
        try {
            
            const {refreshToken} = req.cookies
            const token = await UserService.logout(refreshToken)

            if(token.isError === true){
                return res.status(token.status).json({message: token.message})
            }

            res.clearCookie('refreshToken')
            return res.json(token.payload)

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
        }
    }

    async resetPassword(req, res, next) {
        try {
            
            const {email, password, code} = req.body
            const userData = await UserService.resetPassword(email, password, code)

            if(userData.isError === true){
                return res.status(userData.status).json({message: userData.message})
            }

            return res.status(200).json({message: 'Successfuly reseted'})

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
        }
    }

    async activate(req, res, next) {
        try {
            
            const user = req.body
            const userData = await UserService.activate(user.email,user.code)

            if(userData.isError === true){
                return res.status(userData.status).json({message: userData.message})
            }

            return res.json({message: 'activated'})

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
        }
    }

    async refresh(req, res, next) {
        try {
            
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)

            if(userData.isError === true){
                return res.status(userData.status).json({message: userData.message})
            }

            res.cookie('refreshToken', userData.payload.refreshToken, {maxAge: (3 * 24 * 60 * 60 * 1000), httpOnly: true, sameSite: 'none', secure: true})
            return res.json(userData.payload)

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
        }
    }

    async activationCode(req, res , next) {
        try {
            
            const user = req.body.email

            const userData = await UserService.sendActivationCode(user)

            if(userData.isError === true){
                return res.status(userData.status).json({message: userData.message})
            }

            res.status(200).json({message: 'successfuly sent'})

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
        }
    }

    async uploadAvatar(req, res, next) {
        try {
            
            const info = req.body
            const user = await UserService.uploadAvatar(info.id, info.data)

            return res.json(user) 

        } catch (error) {
            res.status(500).json({message: 'Server Error'}) 
        }
    }

    async changeName(req, res, next) {

        const user = req.body
        const data = await UserService.changeName(user.id, user.name)

        if(data.isError === true){
            return res.status(data.status).json({message: data.message})
        }

        res.status(200).json(data.payload)
    }

    async deleteAccount(req, res, next){
        try {
            
            const user = req.body
            const data = await UserService.deleteAccount(user.id, user.password)

            if(data.isError === true){
                return res.status(data.status).json({message: data.message})
            }
            res.json({message: 'deleted'})
    

        } catch (error) {
            res.status(500).json({message: 'Server Error'})
        }
    }

}

module.exports = new UserController()
