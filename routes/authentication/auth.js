//for routing
const router = require('express').Router()

//model
const userData = require('../../models/user')

//validation
const {registerValidation, loginValidation} = require('../../userValidation')

//bcrypt
const bcrypt = require('bcryptjs')

//login token
const jwt = require('jsonwebtoken')

//register
router.post('/register', async(req, res) =>{
    //data validation before making user
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //checking if the user is already in the database
    const emailExist = await userData.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already Exist')

    //hash passwords
    //gentSalt(int) = the int is the complexity of the string that is generated
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create a new user
    const user = new userData({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try{
        const savedUser = await user.save()
        res.send({user: user._id})
    }catch(err){
        res.status(400).send(err)
    }
})

//login
router.post('/login', async(req,res) =>{
    //validate data
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //checking if the email exist
    const user = await userData.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email is not found')
    //compare user's password input with the database
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid Password')

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

module.exports = router