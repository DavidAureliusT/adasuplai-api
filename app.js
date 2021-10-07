//Imports
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },
    () => console.log("connected to db!")
)

//recognize incoming request object as JSON
app.use(express.json())

//Route
const productRoutes = require('./routes/products')
const authRoute = require("./routes/authentication/auth")
app.use("/api/user", authRoute)

//Middleware
app.use('/product', productRoutes)

app.get('/', (req, res)=> {
    res.send("We are Online")
})

//Web Server
var server = app.listen(process.env.PORT||3000)
