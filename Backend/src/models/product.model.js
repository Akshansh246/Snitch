import mongoose from 'mongoose'
import priceSchema from './price.schema.js';

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
        type: priceSchema,
        required: true
    },
    images:[
        {
            url:{
                type:String,
                required:true
            },
        }
    ],
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
    stock:{
        type: Number,
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
    },
    variants:[
        {
            images:[
                {
                    url: {
                        type:String,
                        required: true
                    }
                }
            ],
            stock:{
                type: Number,
                default: 0
            },
            attributes:{
                type: Map,
                of: String
            },
            price: {
                type: priceSchema,
                required: true
            }
        },
    ]
}, { timestamps: true })

productSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const productModel = mongoose.model('product', productSchema)

export default productModel