const mongoose = require("mongoose")
const SCHEMA = mongoose.Schema

const cartSchema = new SCHEMA({
    cartName: {
        type: String,
        required: true
    },
    item: [
        {
            itemID: {
                type: SCHEMA.Types.ObjectId,
                ref: "products",
                required: true
            },
            itemQuantity: {
                type: Number,
                default: 1
            }
        }
    ]
},
    { timestamps: true }
)

module.exports = mongoose.model("carts", cartSchema)