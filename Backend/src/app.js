import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.route.js';
import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import { config } from './config/config.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js'

const app = express()

app.set('trust proxy', 1)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static('public'));


app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback'
}, (accessToken, refreshToken, profile, done)=>{
    return done(null, profile)
}))


app.get('/',(req, res)=>{
    res.status(200).json({
        message:'Server is running'
    })
})


app.use('/api/auth',authRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)


app.get('*name', (req, res) => {
    res.sendFile("index.html", {
        root: "public"
    })
})

export default app