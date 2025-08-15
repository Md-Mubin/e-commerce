const mongoose = require("mongoose")
const { Schema } = mongoose

//  =========== main order schema
const orderSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    orderItems: [
        {
            quantity: {
                type: Number,
                required: true
            },

            product: {
                type: Schema.Types.ObjectId,
                ref: "products",
                required: true
            }
        }
    ],

    shippingAddress: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "pending",
        enum: ["pending", "proccessing", "skipped", "delivered", "cancelled"]
    },

    paymentResult: {
        id: {
            type: String
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "complete"]
        },
        update_time: {
            type: String
        }
    },

    totalPrice: {
        type: Number,
        required: true
    },

    isPaid: {
        type: Boolean,
        default: false
    },

    isDelivered: {
        type: Boolean,
        default: false
    },

    delivered: {
        type: Date
    }
}, { timestamps: true })

module.exports = mongoose.model("orders", orderSchema)