const express = require('express')
const userModel = require('../model/user.model')
const { registerValidator } = require('../validator/auth.validator')
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { generateToken, decodeToken } = require('../services/auth.service')

router.post('/register', async(req, res) => {
    return new Promise(async (resolve) => {
        const { error } = registerValidator(req.body)
        if(error){
            res.send({ success: false, message: JSON.stringify(error) })
        }
        const { email, password } = req.body
        let isExistUser = await userModel.findOne({ email })
        
        if(isExistUser && isExistUser._id){
            res.send({ success: false, message: "User is Exists please signIn" })
        }
    
        // hash password
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
    
                let user = await userModel.create({ email, password: hash })
                await user.save()
                resolve()
            });
        });
    
        res.send({ success: true, message: "Registerd successfully" })

    })
})

router.post('/login', async(req, res) => {
    return new Promise(async(resolve)=> {
        const { email, password } = req.body
        let isExistUser = await userModel.findOne({ email })
        if(!isExistUser){
            res.send({ success: false, message: "Invalid Credentials" })
        }
        if(isExistUser && isExistUser._id){
            bcrypt.compare(password, isExistUser.password, function(err, result) {
                if(!result){
                    res.send({ success: false, message: "Invalid Credentials" })
                }
                const token = generateToken(isExistUser)
                res.send({ success: true, message: "login successfully", payload: req.body, token })
                resolve(true)
            });
        }
    })
})

router.get('/me', async(req, res) => {
    return new Promise(async(resolve)=> {
        const token = req.headers.authorization
        const isValid = decodeToken(token)
        if(isValid && isValid.userId){
            const user = await userModel.findById({ _id: isValid.userId})
            res.send({ success: true, user })
            resolve(true)
        }
    })
})

module.exports = router