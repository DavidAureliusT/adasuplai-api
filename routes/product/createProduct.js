
const express = require('express')
//for routing
const router = express.Router()
//multer = used for handling multipart/form-data, which is primarily used for uploading files
const multer = require('multer')
const productData = require('../../models/product-model')
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

//create
router.post("/", upload.single("image"), (req,res) => {
    console.log(req.file)
    var product = new productData({
        name : req.get("name"), 
        supplier_id : req.get("supplier_id"),
        category_id : req.get("category_id"),
        price : req.get("price"),
        status : req.get("status"),
        min_order : req.get("min_order"),
        weight : req.get("weight"),
        weight_unit : req.get("weight_unit"),
        description : req.get("description"),
        sku : req.get("sku"),
        stock : req.get("stock"),
        image : req.file.path
    })

    //save into database
    product.save().then(()=> {
        if(product.isNew == false){
            console.log("Saved data!")
            //tells iphone that we sucessfully copy data and save it
            res.send("Saved data!")
        }
        else {
            console.log("Failed to save data")
        }
    })
})

module.exports = router