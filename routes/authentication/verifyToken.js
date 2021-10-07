const jwt = require('jsonwebtoken')

//middleware for any routes that needs to be protected with token
//module exports = make it available anywhere when called
module.exports = function(req,res,next){ 
    //check the header for the token
    const token = req.header('auth-token')
    //if doesn't exist, deny
    if(!token) return res.status(401).send('Access Denied')
    //if has token, verify
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err){
        res.status(400).send('Invalid Token')
    }
}