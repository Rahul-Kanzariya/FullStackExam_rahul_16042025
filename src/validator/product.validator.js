import Joi from "joi";



export function productValidator(data){
    const validator = Joi.object({
        brand: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        rating: Joi.number().optional(),
        seller: Joi.string().required(),
    })

    return validator.validate(data)
}

export function getProductValidator(data){
    const validator = Joi.object({
        page: Joi.number().required(),
        limit: Joi.number().required(),
        search: Joi.string().optional(),
        // query: Joi.object({
        // })
    })

    return validator.validate(data)
}