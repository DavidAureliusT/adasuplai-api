//validation
const joi = require('@hapi/joi')

//register validation
const registerValidation = (data) => {
    const registerSchema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    })
    return registerSchema.validate(data)
}

//login validation
const loginValidation = (data) => {
    const loginSchema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    })
    return loginSchema.validate(data)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation




