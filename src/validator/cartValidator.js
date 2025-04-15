import Joi from "joi";



export function cartValidator(data){
    const validator = Joi.object({
        params  : Joi.object({
            productId: Joi.string().label('Product Id').required()
        })
    })

    return validator.validate(data)
}