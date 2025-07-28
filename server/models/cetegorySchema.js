const mongoose = require("mongoose")
const { Schema } = mongoose

const cetegorySchema = new Schema({
    cetegoryName: {
        type: String,
        required: true
    },
    cetegoryImage: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("categories", cetegorySchema)