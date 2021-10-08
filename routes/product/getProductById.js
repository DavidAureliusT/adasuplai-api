const express = require('express')
//for routing
const router = express.Router()

var productData = require('../../models/product-model')

// FETCH 
router.get('/', async (req, res) => {
    try{
        const id = await productData.findById(req.get("_id"))
        res.send(id)
    } catch(err){
        res.send({message: err})
    }
})

module.exports = router