import express from 'express';
import { validateRegisterUser } from '../validators/auth.validator.js';
import { register } from '../controllers/auth.controller.js';

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




export default authRouter