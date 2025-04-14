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