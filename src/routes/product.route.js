const express = require('express')
const ProductModel = require('../model/product.model')
const { productValidator } = require('../validator/product.validator')
const productModel = require('../model/product.model')
const { createProduct, getProduct } = require('../services/product.service')
const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const response = await getProduct(req)
        res.send(response)
    } catch (error){
        return { success: false, error: JSON.stringify(error) }
    }
})

router.post('/', async(req, res) => {
    try {
        const { error } = productValidator(req.body)
        if(error){
            res.send({ success: false, message: JSON.stringify(error) })
        }
        const response = await createProduct(req.body)
        res.send(response)
    } catch (error){
        return { success: false, error: JSON.stringify(error) }
    }
})

module.exports = router