
const express = require('express')
//for routing
const router = express.Router()

var productData = require('../../models/product')

// FETCH 
router.get('/', (req, res) => {
    productData.find({}).then((DBitems) => { 
        res.send(DBitems)
    })
})

router.get('/:productId', async (req,res, next) => {
    try{
    const id = await productData.findById(req.params.productId)
    res.send(id)
    } catch(err){
        res.send({message: err})
    }
})

module.exports = router