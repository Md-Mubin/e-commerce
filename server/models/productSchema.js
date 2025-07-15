const mongoose = require("mongoose")
const SCHEMA = mongoose.Schema

const productSchema = new SCHEMA({
    title: {
        type: String,
        required: true
    },

    slug:{
        type : String,
        required : true
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
        type: SCHEMA.Types.ObjectId,
        ref: "categories"
    },

    status: {
        type: String,
        default: "pending",
        enum: ["active", "pending", "reject"]
    },

    veriants: [
        {
            name: {
                type: String,
                enum: ["color", "size"]
            },

            options: [
                {
                    colorName: {
                        type: String,
                        required: true
                    },

                    allSizes: {
                        type: String,
                        required: true
                    },

                    additionalPrice: {
                        type: Number,
                        default: 0
                    },
                }
            ]
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("products", productSchema)