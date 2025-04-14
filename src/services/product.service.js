const productModel = require("../model/product.model")

function getProduct(req){
    return new Promise(async (resolve) => {
        let products = await productModel.find({}).select('name price brand seller rating')
        
        resolve({ success: true, products })
    })
}

function createProduct(data){
    return new Promise(async (resolve) => {
        const { brand, name } = data
        let isExistProduct = await productModel.findOne({ brand, name })
        
        if(isExistProduct && isExistProduct._id){
            resolve({ success: false, message: "Product is already Exists" })
        }
    
        let product = await productModel.create(data)
        await product.save()
    
        resolve({ success: true, product })
    })
}


module.exports = {
    createProduct,
    getProduct,
}