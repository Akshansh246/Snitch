import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    contact:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required: function () {
            return !this.googleId
        }
    },
    fullname:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['buyer','seller'],
        default:'buyer'
    },
    googleId:{
        type:String,
        required:false
    },
    bio:{
        type:String,
        default:''
    },
    avatar:{
        type:String,
        default:''
    },
    address:{
        street:{ type: String, default: '' },
        city:{ type: String, default: '' },
        state:{ type: String, default: '' },
        zipcode:{ type: String, default: '' },
        country:{ type: String, default: 'India' }
    }
})

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const userModel = mongoose.model('users',userSchema)

export default userModel