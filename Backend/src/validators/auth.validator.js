import {body, validationResult} from 'express-validator'


function validateRequest(req, res, next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }

    next()
}


export const validateRegisterUser = [
    body('email')
        .isEmail().withMessage('Invalid email format'),
    body('contact')
        .notEmpty().withMessage('Contact is required')
        .matches(/^\d{10}$/).withMessage('Contact must be a 10 digit number'),
    body('password')
        .isLength({ min:6 }).withMessage('Password must be atleast 6 digits long'),
    body('fullname')
        .notEmpty().withMessage('Full name is required')  
        .isLength({min:3}).withMessage('Name must be atleast 3 characters long'),
    body('isSeller')
    .isBoolean().withMessage('isSeller must have a boolean value'),
    
    validateRequest
]

export const validateLoginUser = [
    body('email')
        .isEmail().withMessage('Invalid Email Format'),
    body('password')
        .notEmpty().withMessage('Password is required'),

    validateRequest
]