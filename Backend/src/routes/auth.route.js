import express from 'express';
import { validateLoginUser, validateRegisterUser } from '../validators/auth.validator.js';
import { googleCallback, login, register } from '../controllers/auth.controller.js';
import passport from 'passport';
import { config } from '../config/config.js';

const authRouter = express.Router()

/**
 * @route /api/auth/register
 * @description for the register of the users
 * @access public
 */
authRouter.post('/register', validateRegisterUser, register)


/**
 * @route /api/auth/login
 * @description used for logging in the users
 * @access public
 */
authRouter.post('/login', validateLoginUser, login)

/**
 * @route /api/auth/google
 * @description register using Oauth
 * @access public
 */
authRouter.get('/google', 
    passport.authenticate('google', { scope:['profile','email']}))

authRouter.get('/google/callback', 
    passport.authenticate('google', {
        session:false,
        failureRedirect:config.NODE_ENV == 'development' ? 'http://localhost:5173/login' : '/login'
    })
    ,googleCallback
)


export default authRouter