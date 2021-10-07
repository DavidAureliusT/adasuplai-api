const express = require('express')
const Product = require('../models/product-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /products"
    })
})

router.post('/:productId', (req, res, next) => {
    const id = req.params.productId
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    })
})

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    })
})

// router.post('/create', (req, res) => {
//     var product = new Product({
//         name : String, 
//         supplier_id : String,
//         category_id : String,
//         price : Number,
//         status : String,
//         min_order : Number,
//         weight : Number,
//         weight_unit : String,
//         annotations : [String],
//         etalase : String,
//         description : String,
//         sku : String,
//         stock : Number,
//         wholesale :[wholesaleSchema],
//         variant : variantSchema
//     })
// })


module.exports = router