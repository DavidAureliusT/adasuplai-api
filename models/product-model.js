const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    category_name : String,
})


const optionSchema = new Schema({
    option_name : String,
    option_desc : String,
    // image
})

const variantSchema = new Schema({
    variant_name : String,
    options : [optionSchema]
})

const wholesaleSchema = new Schema({
    min_qty : Number,
    price : Number
})

const productSchema = new Schema({
    name : String, 
    supplier_id : String,
    category_id : String,
    price : Number,
    status : String,
    min_order : Number,
    weight : Number,
    weight_unit : String,
    annotations : [String],
    etalase : String,
    description : String,
    sku : String,
    stock : Number,
    wholesale :[wholesaleSchema],
    variant : variantSchema
})

const Product = mongoose.model("products", productSchema)
module.exports = Product