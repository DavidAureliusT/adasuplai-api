
const express = require('express')
//for routing
const router = express.Router()

var productData = require('../../models/product')

// DELETE 
router.post("/", (req,res) =>{
    productData.findOneAndRemove({
        _id: req.get("id")
    }, (err) => {
        console.log("Failed" + err)
    })
    res.send("Deleted")
})

module.exports = router