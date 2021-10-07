var mongoose = require("mongoose")
var Schema = mongoose.Schema

var product = new Schema({
    sku: String,
    name: String,
    price: Number,
    weight: Number,
    descriptions: String,
    image: String,
    category: String,
    create_date: String,
    stock: Number
})

const productData = mongoose.model("product", product)
module.exports = productData