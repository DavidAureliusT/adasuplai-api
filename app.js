//Imports
const express = require('express')
const app = express()

//Route
const productRoutes = require('./routes/products')

//Middleware
app.use('/product', productRoutes)

app.get('/', (req, res)=> {
    res.send("We are Online")
})

//Web Server
var server = app.listen(process.env.PORT||3000, process.env.WEB_ADDRESS, ()=> {
    console.log("Server is running!")
})
