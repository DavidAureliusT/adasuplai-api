//Imports
const express = require('express')
const app = express()

//Route
const productRoutes = require('./api/routes/products')

//Middleware
app.use('/product', productRoutes)

app.get('/', (req, res)=> {
    res.send("We are Online")
})

//Web Server
var server = app.listen(process.env.PORT||3000)
