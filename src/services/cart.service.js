const cartModel = require("../model/cart.model");

function addCart(params, userId){
    const { productId } = params
    console.log('productId: ', productId);
    
    return new Promise(async (resolve) => {
        let isExisting = await cartModel.findOne({ productId, userId })
        console.log('isExisting: ', isExisting);
        if(isExisting){
            resolve({ success: false, message: "product already in cart"})
        } else {
            let newCart = await cartModel.create({ productId, userId })
            await newCart.save()
            resolve({ success: true, message: "product added successfully in your cart" })
        }

    })
}

function removeCart(params, userId){
    const { productId } = params
    
    return new Promise(async (resolve) => {
        let isExisting = await cartModel.findOne({ productId, userId })
        if(isExisting){
            await cartModel.deleteOne({ productId, userId })
            resolve({ success: true, message: "product removed successfully from cart"})
        } else {
            resolve({ success: true, message: "product is not in your cart" })
        }

    })
}

function getCart(userId){
    return new Promise(async (resolve) => {
        let carts = await cartModel.find({ userId })
            
        resolve({ success: true, data: carts })
    })
}

function clearCart(userId){
    return new Promise(async (resolve) => {
        await cartModel.deleteMany({ userId })
            
        resolve({ success: true, message:"cart cleared successfully" })
    })
}

module.exports = {
    addCart,
    getCart,
    removeCart,
    clearCart,
}