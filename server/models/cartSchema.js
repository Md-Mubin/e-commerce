const mongoose = require("mongoose")
const { Schema } = mongoose

const cartSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref : "users",
        required: true
    },
    item: [
        {
            itemID: {
                type: Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            SKU: {
                type: String,
                required: true 
            },
            itemQuantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]
},
    { timestamps: true }
)

module.exports = mongoose.model("carts", cartSchema)