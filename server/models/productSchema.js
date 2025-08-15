const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    mainImg: {
        type: String,
        required: true
    },

    subImgs: [
        {
            type: String
        }
    ],

    cetegory: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    },

    status: {
        type: String,
        default: "pending",
        enum: ["active", "pending", "reject"]
    },

    veriants: [
        {
            colorName: {
                type: String,
                required: true,
                trim: true
            },

            sizes: [
                {
                    sizeName: {
                        type: String,
                        enum: ["s", "m", "l", "xl", "2xl"],
                        required: true,
                    },
                    additionalPrice: {
                        type: Number,
                        default: 0
                    }
                }
            ]
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("products", productSchema)