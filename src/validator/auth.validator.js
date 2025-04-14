import Joi from "joi";



export function registerValidator(data){
    const validator = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(3).max(15),
    })

    return validator.validate(data)
}