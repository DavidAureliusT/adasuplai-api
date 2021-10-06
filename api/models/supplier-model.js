const express = require("express")
const Schema = express.Schema

const supplierSchema = new Schema({
    supplier_name : String,
    address : [String],
    is_open : Boolean,
    // image
})

const Supplier = mongoose.model("suppliers", supplierSchema)
module.exports = Supplier