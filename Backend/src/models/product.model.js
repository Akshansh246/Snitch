import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    price:{
        amount:{
            type:Number,
            required:true
        },
        currency:{
            type:String,
            enum: ['USD', 'INR', "JPY", 'EUR', 'GBP'],
            default:'INR'
        }
    },
    images:[
        {
            url:{
                type:String,
                required:true
            },
        }
    ],
    stock:{
        type:Number,
        required:true
    },
    color:{
        name:{
            type:String,
            required:true
        },
        swatch:{
            type:String,
            required:true
        }
    },
    sizes:{
        type:[String],
        default: [],
        required: true
    },
    type:{
        type:String,
        default: 'published',
        enum: ['published', 'draft']
    },
    expiresAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

productSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const productModel = mongoose.model('product', productSchema)

export default productModel