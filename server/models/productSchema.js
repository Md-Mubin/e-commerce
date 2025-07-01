const mongoose = require("mongoose")
const SCHEMA = mongoose.Schema

const productSchema = new SCHEMA({
    title: {
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
        type: SCHEMA.Types.ObjectId,
        required: true
    },

    status: {
        type: String,
        default: "pending",
        enum: ["active", "pending", "reject"]
    }
}, { timestamps: true })

module.exports = mongoose.model("products", productSchema)