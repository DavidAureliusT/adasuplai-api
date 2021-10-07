const express = require('express')
const router = express.Router()
var productData = require('../../models/product')

router.post("/", (req,res)=> {
    productData.findOneAndUpdate({
        _id: req.get("id")
    }, {
        sku: req.get("sku"),
        name: req.get("name"),
        price: req.get("price"),
        weight: req.get("weight"),
        descriptions: req.get("descriptions"),
        image: req.get.path,
        category: req.get("category"),
        create_date: req.get("create_date"),
        stock: req.get("stock"),
    }, (err) => {
        console.log("Failed to update" + err)
    })
    res.send("Updated!")
})

module.exports = router