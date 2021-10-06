const express = require('express')
const app = express()

const productRoutes = require('./api/routes/products')

app.use('/product', productRoutes)

app.use((req, res, next) => {
    res.status(200).send({
        message: "It Works"
    });
    console.log("App server is running!")
}) // <- use == middleware | it will be called everytime we call the API

module.exports = app