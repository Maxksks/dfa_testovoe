const User = require('../models/User')
const Role = require('../models/Role')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const {secret} = require('../config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})

}

class AuthController {
    async registration(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:'Registration error', errors})
            }
            const {userName, password} = req.body
            const existingUser = await User.findOne({userName})
            if(existingUser){
                return res.status(400).json({message: 'User exists'})
            }

            const hashPassword = bcryptjs.hashSync(password, 6)
            const userRole = await Role.findOne({value: 'user'})
            const user = new User({userName, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'user registered'})
        } catch (e){
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res){
        try{
            const {userName, password} = req.body
            const user = await User.findOne({userName})
            if(!user){
                return res.status(400).json({message:`Not found user: ${userName}`})
            }

            const validPassword = bcryptjs.compareSync(password, user.password)
            if (!validPassword){
                return res.status(400).json({message:`Wrong password`})
            }

            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUser(req, res){
        try{
            const userId = req.user.id
            const user = User.findById(userId)
            return res.status(200).json({user})
        } catch (e){
            console.log(e)
            res.status(400).json({message: 'Bad request'})
        }
    }

}

module.exports = new AuthController()