const productModel = require("../model/product.model")

function getProduct(req){
    return new Promise(async (resolve) => {
        const { query } = req
        query.limit = Number(query.limit)
        const skip = (query.limit * query.page) - query.limit

        let queryPipeline = []
        if (query.search) {
            queryPipeline.push(
                {
                    $match: {
                        brand: {
                            $regex: query.search,
                            $options: 'i',
                        },
                    },
                },
            )

        }
        queryPipeline.push(
            {
                $skip: skip
            }
        )
        queryPipeline.push(
            {
                $limit: query.limit
            }
        )
        
        const products = await productModel.aggregate(queryPipeline)
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