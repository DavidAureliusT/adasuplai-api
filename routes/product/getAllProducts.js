const express = require('express')
//for routing
const router = express.Router()

var productData = require('../../models/product-model')

// FETCH 
router.get('/', async (req, res) => {
    try{
        productData.find({}).then((DBitems) => { 
            res.send(DBitems)
        })
    } catch(err){
        res.send({message: err})
    }
})

module.exports = router