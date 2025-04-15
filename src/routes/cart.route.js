const express = require('express')
const { addCart, getCart, removeCart, clearCart } = require('../services/cart.service')
const router = express.Router()

router.get('/:productId/add', async(req, res) => {
    try {
        const response = await addCart(req.params, req.userData._id)
        res.send(response)
    } catch (error){
        return { success: false, error: JSON.stringify(error) }
    }
})

router.get('/:productId/remove', async(req, res) => {
    try {
        const response = await removeCart(req.params, req.userData._id)
        res.send(response)
    } catch (error){
        return { success: false, error: JSON.stringify(error) }
    }
})

router.get('/', async(req, res) => {
    try {
        const response = await getCart(req.userData._id)
        res.send(response)
    } catch (error){
        return { success: false, error: JSON.stringify(error) }
    }
})

router.get('/clear', async(req, res) => {
    try {
        const response = await clearCart(req.userData._id)
        res.send(response)
    } catch (error){
        return { success: false, error: JSON.stringify(error) }
    }
})

module.exports = router