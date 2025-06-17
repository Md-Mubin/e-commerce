const mongoose = require("mongoose")
const SCHEMA = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new SCHEMA({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: Number,
        required: true,
    },

    pass: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        default: ""
    },

    OTP: {
        type: String,
    },

    OTP_expireTime: {
        type: Date,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    OTP_failedAttempt: {
        type: Number,
        default: 0
    },

    resetPassID: {
        type: String
    },

    resetPassID_expireAt: {
        type: Date
    }
},
    { timestamps: true }
)

// creating hash password and save it in schema
userSchema.pre("save", async function (next) {
    if (!this.isModified("pass")) return next()

    this.pass = await bcrypt.hash(this.pass, 10)
    next()
})

// check if the req password = saved hash password in the database
userSchema.methods.isPassValid = async function (userPass) {
    return await bcrypt.compare(userPass, this.pass)
}

module.exports = mongoose.model("usersID", userSchema)