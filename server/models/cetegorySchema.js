const mongoose = require("mongoose")
const SCHEMA = mongoose.Schema

const cetegorySchema = new SCHEMA({
    cetegoryName: {
        type: String,
        required: true
    },
    cetegoryImage : {
        type : String,
        required : true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("categories", cetegorySchema)