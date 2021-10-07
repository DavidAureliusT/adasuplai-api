//Imports
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },
    () => console.log("connected to db!")
)

//make the upload folder available to everyone
app.use('/uploads',express.static("uploads"))

//recognize incoming request object as JSON for authentication
app.use(express.json())

//Route
const productRoutes = require('./routes/products')
const createProductRoute = require("./routes/product/createProduct")
const fetchProductRoute = require("./routes/product/fetchProduct")
const deleteProductRoute = require("./routes/product/deleteProduct")
const updateProductRoute = require("./routes/product/updateProduct")
const authRoute = require("./routes/authentication/auth")

//Middleware
app.use('/product', productRoutes)
app.use('/createProduct', createProductRoute)
app.use("/fetchProduct", fetchProductRoute)
app.use("/deleteProduct", deleteProductRoute)
app.use("/updateProduct", updateProductRoute)
app.use("/api/user", authRoute)

//Web Server
var server = app.listen(process.env.PORT||3000)
