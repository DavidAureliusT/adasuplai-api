const express = require('express')
const router = express.Router()
var productData = require('../../models/product-model')


//multer = used for handling multipart/form-data, which is primarily used for uploading files
const multer = require('multer')
//allows you to adjust how files get stored
//cb(null) = if error pass null. if pass error it will crash.
const storage = multer.diskStorage({
    //which is a function which tells where the file should be stored
    destination: function(req, file, cb){
        cb(null, "./uploads/")
    },
    //defines how the files should be named
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})

//filters the file
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        // store the file
        cb(null, true)
    } else{
        // reject a file
        cb(null,false)
    }
    
}

//storage = specifies the folder where multer will store all the incoming files
//isn't publicly accessible by default, so we need to turn it into static folder (uploads)
const upload = multer({storage: storage, limits: {
    //limits to certain number of bytes
    fileSize: 1024*1024*5
 },
 //filter file
 fileFilter: fileFilter
})

router.post("/",upload.single("image"),(req,res)=> {
    //Check if the image sent from iphone, exist
    //replace image with the new image sent
    if (req.file){
        const image = req.file.path;
        var updateProductData = {
            sku: req.get("sku"),
            name: req.get("name"),
            price: req.get("price"),
            weight: req.get("weight"),
            descriptions: req.get("descriptions"),
            image: image,
            category: req.get("category"),
            create_date: req.get("create_date"),
            stock: req.get("stock"),
        }
    } else {
        var updateProductData = {
            sku: req.get("sku"),
            name: req.get("name"),
            price: req.get("price"),
            weight: req.get("weight"),
            descriptions: req.get("descriptions"),
            category: req.get("category"),
            create_date: req.get("create_date"),
            stock: req.get("stock"),
        }
    }

    productData.findOneAndUpdate({
        _id: req.get("id")
    },updateProductData,(err) => {
        console.log("Failed to update" + err)
    })
    res.send("Updated!")
})

module.exports = router


// router.post("/", (req,res) => {
//     productData.findOneAndUpdate({
//         _id: req.get("_id")
//     }, {
//         name : req.get("name"), 
//         supplier_id : req.get("supplier_id"),
//         category_id : req.get("category_id"),
//         price : req.get("price"),
//         status : req.get("status"),
//         min_order : req.get("min_order"),
//         weight : req.get("weight"),
//         weight_unit : req.get("weight_unit"),
//         description : req.get("description"),
//         sku : req.get("sku"),
//         stock : req.get("stock"),
//         image : req.file.path
//     }, (err) => {

//         console.log("Failed to update" + err)
//     })
//     res.send("Updated!")
// })