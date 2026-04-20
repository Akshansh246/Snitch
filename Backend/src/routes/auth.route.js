import express from 'express';
import { validateLoginUser, validateRegisterUser } from '../validators/auth.validator.js';
import { getMe, googleCallback, login, logout, register } from '../controllers/auth.controller.js';
import passport from 'passport';
import { config } from '../config/config.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

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


/**
 * @route /api/auth/get-me
 * @description returns the details of a user logged in
 * @access private
 */
authRouter.get('/get-me', authenticateUser, getMe)


/**
 * @route /api/auth/logout
 * @description logouts the user clear the cookie
 * @access private
 */
authRouter.post('/logout', logout)


export default authRouter