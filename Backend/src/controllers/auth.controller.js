import { config } from "../config/config.js"
import userModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'

async function sendTokenResponse(user, res, message) {
    const token = jwt.sign({
        id: user._id
    }, config.JWT_SECRET, {
        expiresIn:'7d'
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' || config.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message:message,
        success:true,
        user:{
            id:user._id,
            email:user.email,
            contact:user.contact,
            fullname:user.fullname,
            role:user.role,
            bio:user.bio || '',
            avatar:user.avatar || '',
            address:user.address || {}
        }
    })
}


export const register = async (req, res) =>{
    const {email, contact, password, fullname, isSeller} = req.body
    
    if(!email || !contact || !password || !fullname){
        return res.status(400).json({
            success: false,
            message: "Please fill in all required fields (email, contact, password, full name)."
        })
    }

    if(password.length < 6){
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long."
        })
    }

    try {
        const existingUser = await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })

        if(existingUser){
            const message = existingUser.email === email
                ? "User with this email address already exists."
                : "User with this contact number already exists."
            return res.status(400).json({
                success: false,
                message
            })
        }

        const user = await userModel.create({
            email,
            contact,
            password,
            fullname,
            role: isSeller ? 'seller' : 'buyer'
        })

        await sendTokenResponse(user, res, 'User Registered Successfully.')

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server error'
        });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Email and password are required."
        })
    }

    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Incorrect Email or Password."
            })
        }

        const isMatch = await user.comparePassword(password)

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect Email or Password."
            })
        }

        await sendTokenResponse(user, res, 'User Logged in Successfully')
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server error during login'
        });
    }
}

export const googleCallback = async (req, res) => {
    
    const {id, displayName, emails, photos} = req.user
    const email = emails[0].value
    const photo = photos?.[0]?.value || ''

    let user = await userModel.findOne({email})

    if(!user){
        user = await userModel.create({
            email,
            googleId: id,
            fullname: displayName,
            avatar: photo
        })
    } else if (!user.googleId) {
        user.googleId = id
        if (!user.avatar && photo) user.avatar = photo
        await user.save()
    }

    const token = jwt.sign({
        id:user._id,
    }, config.JWT_SECRET, {
        expiresIn: '7d'
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' || config.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    const redirectUrl = process.env.CLIENT_URL || (config.NODE_ENV === 'development' ? 'http://localhost:5173/' : '/')
    res.redirect(redirectUrl)
}

export const getMe = async (req, res) => {
    const user = req.user

    res.status(200).json({
        message:"User fetched sucessfully!",
        success:true,
        user:{
            id:user._id,
            email:user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role,
            bio: user.bio || '',
            avatar: user.avatar || '',
            address: user.address || {}
        }
    })
}

export const updateProfile = async (req, res) => {
    const { fullname, contact, bio, avatar, address, role } = req.body

    try {
        const user = await userModel.findById(req.user._id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            })
        }

        if (fullname !== undefined) user.fullname = fullname
        if (contact !== undefined) user.contact = contact
        if (bio !== undefined) user.bio = bio
        if (avatar !== undefined) user.avatar = avatar
        if (role !== undefined && ['buyer', 'seller'].includes(role)) user.role = role
        if (address !== undefined) {
            user.address = {
                ...user.address,
                ...address
            }
        }

        await user.save()

        res.status(200).json({
            message: "Profile updated successfully!",
            success: true,
            user: {
                id: user._id,
                email: user.email,
                contact: user.contact,
                fullname: user.fullname,
                role: user.role,
                bio: user.bio || '',
                avatar: user.avatar || '',
                address: user.address || {}
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to update profile."
        })
    }
}

export async function logout(req, res) {
    res.clearCookie('token')

    res.status(200).json({
        message:"Logout Successfull",
        success:true,
    })
}