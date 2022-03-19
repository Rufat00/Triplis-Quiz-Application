const User = require('../models/User')
const { cloudinary } = require('../utils/storage')
const hash = require('bcryptjs')
const uuid = require('uuid')
const MailService = require('./mail.service')
const TokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')
const error = require('../functions/error.function')
const success = require('../functions/success.function')


class UserService{
    async registration (email, password, name) {

        const isCreated = await User.findOne({email})
        if(isCreated){
            return error("This email is already using.",412)
        }

        const hashedPassword = await hash.hash(password, 8)
        const user = await User.create({email: email, password: hashedPassword, name: name,})
        await this.sendActivationCode(user.email)

        return success(null)
    }

    async sendActivationCode (email) {

        const user = await User.findOne({email: email})
        if(!user){
            return error("there is no user with this email.",404)
        }

        const activationCode = uuid.v4().substr(0,8)
        user.activationCode = activationCode
        await user.save()
        await MailService.sendActivationMail({email: user.email, code: user.activationCode})

        return success(null) 

    }

    async activate(email,activationCode){

        const user = await User.findOne({email: email})
        if(!user){
            return error("there is no user with this email.",404)
        }
        if(user.activationCode === activationCode){
            user.isActivated = true
            return await user.save()
        }
        return error("Wrong activation code.", 403)
    }

    async login(email, password){

        const user = await User.findOne({email: email})
        if(!user){
            return error("there is no user with this email.",404)
        }
        if(user.isActivated === false){

            await User.findOneAndDelete({_id: user._id})
            return error("there is no user with this email.",404)
        }
        const isPassword = await hash.compare(password,user.password)
        if(isPassword === false){
            return error("Wrong password!", 403)
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto}) 

        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return success({...tokens,user: userDto})

    }


    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return success(token)
    }


    async resetPassword(email,password,code){

        const user = await User.findOne({email: email})
        if(!user){
            return error("there is no user with this email.",404)
        }
        if(user.isActivated === false){

            await User.findOneAndDelete({_id: user._id})
            return error("there is no user with this email.",404)
        }
        if(user.activationCode !== code){
            return error("Wrong activation code.", 403)
        }
        
        const hashedPassword = await hash.hash(password, 8)
        user.password = hashedPassword
        await user.save()

        return success(null)
    }


    async refresh(refreshToken) {
        if(!refreshToken){
            return error('Not valid tokens', 400)
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const isToken = await TokenService.findToken(refreshToken)
        if(!userData || !isToken){
            return error('Not valid tokens', 400)
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto}) 

        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return success({...tokens,user: userDto})
    }


    async uploadAvatar(id,file){

        const user = await User.findOne({_id: id})

        if(user.avatar.public_id !== process.env.DEFAULT_AVATAR_ID){
            await cloudinary.uploader.destroy(user.avatar.public_id)
        }

        const data = await cloudinary.uploader.upload(
            file, {
                upload_preset: process.env.AVATAR_UPLOAD_PRESET,
                aspect_ratio: "1:1", 
                crop: "fill"
            } 
        )

        user.avatar = {
            url: data.url,
            public_id: data.public_id
        }
        await user.save()

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto}) 

        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens,user: userDto}

    }


    async deleteAccount(id,password){

        const user = await User.findOne({_id: id})
        if(!user){
            return error("there is no user with this email.",404)
        }

        const isPassword = await hash.compare(password,user.password)
        if(isPassword === false){
            return error("Wrong password!", 403)
        }

        await User.findOneAndDelete({_id: user._id})

        if(user.avatar.public_id !== process.env.DEFAULT_AVATAR_ID){
            await cloudinary.uploader.destroy(user.avatar.public_id)
        }
        
        return success(null)

    }

    async changeName(id, newName){

        const user = await User.findOne({_id: id})
        if(!user){
            return error("there is no user with this email.",404)
        }
        user.name = newName
        await user.save()

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto}) 

        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return success({...tokens,user: userDto})
    }

} 

module.exports = new UserService()